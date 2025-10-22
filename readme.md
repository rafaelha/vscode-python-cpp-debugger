> **Note:** This is a community-maintained fork of the original [Python C++ Debugger](https://github.com/benibenj/vscode-pythonCpp/) extension by Benjamin Simmonds.
>
> This fork is not officially maintained by the original author. The code is largely unchanged from the original, but with an added default configuration to support debugging out of the box on macOS. The extension is also made available on the [Open VSX Registry](https://open-vsx.org/extension/rafaelha/pythoncpp-debug).

# VS Code Python C++ Debug

This debugger starts a python debugger and attaches a C++ debugger to it for debugging python code that calls functions from shared object files (.so/.dll).

![vscode-pythonCpp example](images/pythonCppExample.gif)

## Python C++ Debug Requirements

To use this debug-extension you must have the following extensions installed:

- Python by Microsoft (ms-python.python)
- C/C++ by Microsoft (ms-vscode.cpptools)

## Default Configurations:

If you plan to use the default configuration of the python and/or C++ debugger, you don't need to define them manually.

- **Python:** `pythonConfig: default` will start the Python debugger with the default configuration (Python: Current File)
- **C++:**
  - `cppConfig: default` will automatically choose the appropriate debugger based on your platform (LLDB for macOS, GDB for Linux, MS debugger for Windows)
  - `cppConfig: default (win) Attach` will attach the C++ debugger with the `(Windows) Attach` config.
  - `cppConfig: default (gdb) Attach` will attach the C++ debugger with the `(gdb) Attach` config. This will also set the program path automatically to the path of the current python interpreter and lookup the gdb path.
  - `cppConfig: default (lldb) Attach` will attach the C++ debugger with the `(lldb) Attach` config for macOS users.

```json
{
  "version": "0.3.0",
  "configurations": [
    {
      "name": "Python C++ Debug",
      "type": "pythoncpp",
      "request": "launch",
      "pythonConfig": "default",
      "cppConfig": "default"
    }
  ]
}
```

## Custom Configurations:

To manually define the configurations you can set the attributes `pythonLaunchName` & `cppAttachName` to the name of the configuration you wish to use from your launch.json file.

The following is an example launch.json file for windows users. If your working on Linux make sure to have a `(gdb) Attach` configuration instead of `(Windows) Attach`.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python C++ Debug",
      "type": "pythoncpp",
      "request": "launch",
      "pythonLaunchName": "Python: Current File",
      "cppAttachName": "(Windows) Attach"
    },
    {
      "name": "(Windows) Attach",
      "type": "cppvsdbg",
      "request": "attach",
      "processId": ""
    },
    {
      "name": "Python: Current File",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal"
    }
  ]
}
```

## What the debugger does

When you start Python C++ Debug it launches a Python debugger and attaches a C++ debugger to it by using the processId of the python debugger. As soon as both debuggers are attached the Python C++ debugger terminates.

## Installation

### From OVSX Marketplace (Open VSX)

This extension is available on the [Open VSX Registry](https://open-vsx.org/extension/rafaelha/pythoncpp-debug).

### From VS Code Marketplace

The original extension is still available on the VS Code Marketplace. On MacOs, this requires a manual configuration for LLDB.

### Manual Installation

You can also install this extension manually by downloading the `.vsix` file from the [Open VSX Registry](https://open-vsx.org/extension/rafaelha/pythoncpp-debug).

## Additional information

- Make sure the shared object files (.so/.dll) you are loading your functions from have been compiled with `debug info`.
- Between consecutive `breakpoints` where one is located in python and the other in the C++ code, only the 'continue' button will work correctly.
- Additionally, the `restart button` isn't supported due to the Python debugger changing its processId after a restart.

## Contributing

This is a community-maintained fork. Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `yarn lint` and `yarn format` to ensure code quality
5. Submit a pull request

## License

This project is licensed under the MIT License.
