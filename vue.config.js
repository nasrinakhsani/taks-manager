const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  // Konfigurasi alias untuk path
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve(__dirname, "src"));
  },
  // Mengaktifkan transpileDependencies untuk kompatibilitas dengan browser lama
  transpileDependencies: true,
});
