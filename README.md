# Sagely Introduction to TDD Exercises

## Development Environment Setup

### Local Development
Requirements
- Git
- Node 18.9+
- NPM 9+
- [Visual Studio Code](https://code.visualstudio.com/)

1. Install the following Visual Studio Code plugins:
    - [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [rvest.vs-code-prettier-eslint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
1. Clone the exercise repository
    ``` bash
    git clone https://github.com/growsagely/test-driven-development-exercises-intro.git
    ```
1. Install the dependencies
    ``` bash
    npm install
    ```
1. Run the following command to auto run the test suite any time a file changes.
    ``` bash
    npm run test:watch
    ```

### GitHub Code Spaces
1. Log into GitHub
1. Navigate to the
   [test-driven-development-exercises-intro](https://github.com/growsagely/test-driven-development-exercises-intro)
   repository
1. Open Codespaces
   ![Codespace](./readme_img/codespace.png)
1. Press Ctrl+Shift+\` to open a terminal window
1. Type `npm run test:watch` to auto run the test suite any time a file changes.

### Local Development Container
Requirements
- Git
- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://docs.docker.com/get-docker/)

1. Install the [Dev
   Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   Visual Studio Code plugin.
1. Clone the exercise repository
    ``` bash
    git clone https://github.com/growsagely/test-driven-development-exercises-intro.git
    ```
1. Open the cloned folder with Visual Studio Code
1. Click the `Remote Window` button in lower left hand corner of the Visual
   Studio Code window.
   ![Open Container Window](./readme_img/open_container_window.png)
1. Select `Reopen in Container` from the select menu.
    ![Reopen in Container](./readme_img/reopen.png)
1. Be patient, the first time loading the container may take several minutes.
   Subsequent loads will be much faster.
1. Press Ctrl+Shift+\` to open a terminal window
1. Type `npm run test:watch` to auto run the test suite any time a file changes.
