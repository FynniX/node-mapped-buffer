#if defined __linux__ || defined _WIN32

#include "mapped_buffer.h"

char *MappedBuffer::view()
{
    if (buffer != nullptr)
        return buffer;

#ifdef __linux__
    buffer = (char *)mmap(NULL, _bufferSize, PROT_READ | PROT_WRITE, MAP_SHARED, file, 0);
#elif _WIN32
    buffer = (char *)MapViewOfFile(file, FILE_MAP_ALL_ACCESS, 0, 0, _bufferSize);
#endif

    return buffer;
}

MappedBuffer::MappedBuffer(const Napi::CallbackInfo &info) : ObjectWrap(info)
{
    Napi::Env env = info.Env();

    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return;
    }

    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, "You need to pass a string for buffer path")
            .ThrowAsJavaScriptException();
        return;
    }

    if (!info[1].IsNumber())
    {
        Napi::TypeError::New(env, "You need to pass a number for buffer size")
            .ThrowAsJavaScriptException();
        return;
    }

    _bufferPath = info[0].As<Napi::String>().Utf8Value();
    _bufferSize = info[1].As<Napi::Number>().Uint32Value();
}

Napi::Value MappedBuffer::Create(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    if (file != -1)
    {
        Napi::TypeError::New(env, "File mapping already exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    file = open(
        _bufferPath.c_str(),
        O_RDWR | O_CREAT | O_TRUNC,
        0x0777);

    if (file < 0)
    {
        Napi::TypeError::New(env, "Couldn't create file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#elif _WIN32
    if (file != nullptr)
    {
        Napi::TypeError::New(env, "File mapping already exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    file = CreateFileMappingA(
        INVALID_HANDLE_VALUE, // use paging file
        NULL,                 // default security
        PAGE_READWRITE,       // read/write access
        0,                    // maximum object size (high-order DWORD)
        _bufferSize,          // maximum object size (low-order DWORD)
        _bufferPath.c_str()); // path of mapping object

    if (file == nullptr)
    {
        Napi::TypeError::New(env, "Couldn't create file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

    return Napi::Buffer<char>::New(env, view(), _bufferSize);
}

Napi::Value MappedBuffer::Open(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (file != nullptr)
    {
        Napi::TypeError::New(env, "File mapping already exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    file = open(
        _bufferPath.c_str(),
        O_RDWR,
        0x0777);

    if (file < 0)
    {
        Napi::TypeError::New(env, "Couldn't open file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#elif _WIN32
    file = OpenFileMappingA(
        FILE_MAP_ALL_ACCESS,  // read/write access
        FALSE,                // do not inherit the name
        _bufferPath.c_str()); // path of mapping object

    if (file == nullptr)
    {
        Napi::TypeError::New(env, "Couldn't open file mapping (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

    return Napi::Buffer<char>::New(env, view(), _bufferSize);
}

Napi::Value MappedBuffer::Read(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    file = open(
        _bufferPath.c_str(),
        O_RDWR,
        0x0777);

    if (file < 0)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#elif _WIN32
    file = OpenFileMappingA(
        FILE_MAP_ALL_ACCESS,  // read/write access
        FALSE,                // do not inherit the name
        _bufferPath.c_str()); // path of mapping object

    if (file == nullptr)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

    return Napi::Buffer<char>::New(env, view(), _bufferSize);
}

Napi::Value MappedBuffer::Write(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (!info[0].IsBuffer())
    {
        Napi::TypeError::New(env, "You need to pass a buffer for writing")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    Napi::Buffer<char> newBuffer = info[0].As<Napi::Buffer<char>>();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    if (file < 0)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#elif _WIN32
    if (file == nullptr)
    {
        Napi::TypeError::New(env, "File mapping doesn't exists")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

        if (newBuffer.Length() > _bufferSize)
    {
        Napi::TypeError::New(env, "Buffer is too big")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    std::memcpy(buffer, newBuffer.Data(), newBuffer.Length());

#ifdef __linux__
    if (lseek(file, 0, SEEK_SET) == -1 || write(file, buffer, _bufferSize) != 1)
    {
        Napi::TypeError::New(env, "Couldn't flush view of file (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#elif _WIN32
    if (!FlushViewOfFile(buffer, _bufferSize))
    {
        Napi::TypeError::New(env, "Couldn't flush view of file (" + _bufferPath + ").")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }
#endif

    return env.Undefined();
}

Napi::Value MappedBuffer::Close(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (_bufferPath.empty() || _bufferSize == 0)
    {
        Napi::TypeError::New(env, "You need to initialize the buffer first")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

#ifdef __linux__
    if (buffer != nullptr)
        munmap(buffer, _bufferSize);

    if (file != -1)
        close(file);

    file = -1;
#elif _WIN32
    if (buffer != nullptr)
        UnmapViewOfFile(buffer);

    if (file != nullptr)
        CloseHandle(file);

    file = nullptr;
#endif

    buffer = nullptr;

    return env.Undefined();
}

Napi::Function MappedBuffer::GetClass(Napi::Env env)
{
    return DefineClass(
        env,
        "MappedBuffer",
        {
            MappedBuffer::InstanceMethod("create", &MappedBuffer::Create),
            MappedBuffer::InstanceMethod("open", &MappedBuffer::Open),
            MappedBuffer::InstanceMethod("read", &MappedBuffer::Read),
            MappedBuffer::InstanceMethod("write", &MappedBuffer::Write),
            MappedBuffer::InstanceMethod("close", &MappedBuffer::Close),
        });
}

Napi::Value GetVarTypeSize(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (info.Length() < 1)
    {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    if (!info[0].IsString())
    {
        Napi::TypeError::New(env, "You need to pass a string for the variable type")
            .ThrowAsJavaScriptException();
        return env.Undefined();
    }

    std::string varType = info[0].As<Napi::String>().Utf8Value();

    if (varType.compare("char") == 0)
        return Napi::Number::New(env, sizeof(char));
    if (varType.compare("char16_t") == 0)
        return Napi::Number::New(env, sizeof(char16_t));
    if (varType.compare("char32_t") == 0)
        return Napi::Number::New(env, sizeof(char32_t));
    if (varType.compare("wchar_t") == 0)
        return Napi::Number::New(env, sizeof(wchar_t));
    if (varType.compare("unsigned_char") == 0)
        return Napi::Number::New(env, sizeof(unsigned char));

    if (varType.compare("short_int") == 0)
        return Napi::Number::New(env, sizeof(short int));
    if (varType.compare("int") == 0)
        return Napi::Number::New(env, sizeof(int));
    if (varType.compare("long_int") == 0)
        return Napi::Number::New(env, sizeof(long int));
    if (varType.compare("long_long_int") == 0)
        return Napi::Number::New(env, sizeof(long long int));

    if (varType.compare("unsigned_short_int") == 0)
        return Napi::Number::New(env, sizeof(unsigned short int));
    if (varType.compare("unsigned_int") == 0)
        return Napi::Number::New(env, sizeof(unsigned int));
    if (varType.compare("unsigned_long_int") == 0)
        return Napi::Number::New(env, sizeof(unsigned long int));
    if (varType.compare("unsigned_long_long_int") == 0)
        return Napi::Number::New(env, sizeof(unsigned long long int));

    if (varType.compare("int8_t") == 0)
        return Napi::Number::New(env, sizeof(int8_t));
    if (varType.compare("int16_t") == 0)
        return Napi::Number::New(env, sizeof(int16_t));
    if (varType.compare("int32_t") == 0)
        return Napi::Number::New(env, sizeof(int32_t));
    if (varType.compare("int64_t") == 0)
        return Napi::Number::New(env, sizeof(int64_t));

    if (varType.compare("uint8_t") == 0)
        return Napi::Number::New(env, sizeof(uint8_t));
    if (varType.compare("uint16_t") == 0)
        return Napi::Number::New(env, sizeof(uint16_t));
    if (varType.compare("uint32_t") == 0)
        return Napi::Number::New(env, sizeof(uint32_t));
    if (varType.compare("uint64_t") == 0)
        return Napi::Number::New(env, sizeof(uint64_t));

    if (varType.compare("float") == 0)
        return Napi::Number::New(env, sizeof(float));
    if (varType.compare("double") == 0)
        return Napi::Number::New(env, sizeof(double));

    if (varType.compare("bool") == 0)
        return Napi::Number::New(env, sizeof(bool));

    Napi::TypeError::New(env, "Variable type was not found")
        .ThrowAsJavaScriptException();
    return env.Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "MappedBuffer"), MappedBuffer::GetClass(env));
    exports.Set(Napi::String::New(env, "getVarTypeSize"), Napi::Function::New<GetVarTypeSize>(env));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)

#endif