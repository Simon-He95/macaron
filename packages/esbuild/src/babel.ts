import { comptimeCssBabelPlugin, PluginOptions } from '@comptime-css/babel';
import { transformFileAsync } from '@babel/core';

export async function babelTransform(path: string) {
  const options: PluginOptions = { result: ['', ''], path };
  const result = await transformFileAsync(path, {
    plugins: [comptimeCssBabelPlugin(options)],
    presets: ['@babel/preset-typescript'],
    sourceMaps: 'inline',
  });

  if (result === null || result.code === null)
    throw new Error(`Could not transform ${path}`);

  return { result: options.result, code: result.code };
}