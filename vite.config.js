

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command }) => {

  return {
    plugins:[
        vue()
    ],
    build:{
      minify:false,
      target: 'es2015', // 设置构建目标为 ES6

    }
  };
});
