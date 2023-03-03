// tsup.config.ts
import { defineConfig } from "tsup";
import { findUpSync } from "find-up";
var tsup_config_default = defineConfig({
  clean: true,
  format: ["cjs", "esm"],
  entry: ["./src/**/*"],
  inject: process.env.JSX ? [findUpSync("react-shim.js")] : void 0,
  treeshake: true,
  minify: true,
  dts: true,
  legacyOutput: false
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnO1xuaW1wb3J0IHsgZmluZFVwU3luYyB9IGZyb20gJ2ZpbmQtdXAnO1xuXG5pbXBvcnQgcGFja2FnZUpTT04gZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBjbGVhbjogdHJ1ZSxcbiAgZm9ybWF0OiBbJ2NqcycsICdlc20nXSxcbiAgZW50cnk6IFsnLi9zcmMvKiovKiddLFxuICBpbmplY3Q6IHByb2Nlc3MuZW52LkpTWCA/IFtmaW5kVXBTeW5jKCdyZWFjdC1zaGltLmpzJykhXSA6IHVuZGVmaW5lZCxcbiAgdHJlZXNoYWtlOiB0cnVlLFxuICBtaW5pZnk6IHRydWUsXG4gIGR0czogdHJ1ZSxcbiAgbGVnYWN5T3V0cHV0OiBmYWxzZVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsa0JBQWtCO0FBSTNCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxFQUNQLFFBQVEsQ0FBQyxPQUFPLEtBQUs7QUFBQSxFQUNyQixPQUFPLENBQUMsWUFBWTtBQUFBLEVBQ3BCLFFBQVEsUUFBUSxJQUFJLE1BQU0sQ0FBQyxXQUFXLGVBQWUsQ0FBRSxJQUFJO0FBQUEsRUFDM0QsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsS0FBSztBQUFBLEVBQ0wsY0FBYztBQUNoQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
