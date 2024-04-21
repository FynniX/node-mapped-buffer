#pragma once

#include <iostream>
#include <napi.h>

#ifdef __linux__
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/mman.h>
#elif _WIN32
#include <windows.h>
#endif

class MappedBuffer : public Napi::ObjectWrap<MappedBuffer>
{
private:
#ifdef __linux__
    int file = -1;
#elif _WIN32
    HANDLE file = nullptr;
#endif
    char *buffer = nullptr;
    std::string _bufferPath;
    uint32_t _bufferSize = 0;
    char *view();

public:
    MappedBuffer(const Napi::CallbackInfo &);
    Napi::Value Create(const Napi::CallbackInfo &);
    Napi::Value Open(const Napi::CallbackInfo &);
    Napi::Value Read(const Napi::CallbackInfo &);
    Napi::Value Write(const Napi::CallbackInfo &);
    Napi::Value Close(const Napi::CallbackInfo &);
    static Napi::Function GetClass(Napi::Env);
};

Napi::Value GetVarTypeSize(const Napi::CallbackInfo &);
Napi::Object Init(Napi::Env env, Napi::Object exports);