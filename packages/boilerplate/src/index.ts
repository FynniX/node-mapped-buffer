import { MappedBuffer } from '@mapped.js/buffer'
import { Test, ITest, TestPath } from '@mapped.js/cli/schema'

export const buffer = new MappedBuffer<ITest>(TestPath, Test)
