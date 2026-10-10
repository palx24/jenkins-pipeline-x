# jenkins-pipeline-x

An automated, containerized **Node.js** web application using **Express**. This project features double-layered continuous integration pipelines utilizing both **Jenkinsfile Declarative Pipelines** and **GitHub Actions Workflows**.

---

## 🚀 Key Features
* **Hybrid CI/CD Ready:** Automated building and testing workflows configured for both **Jenkins** and **GitHub Actions**.
* **Quality Gates:** Complete automated unit testing matrix via Jest (`app.test.js`).
* **Container Architecture:** Production-ready `Dockerfile` to seamlessly bundle the Node.js runtime environment.

---

## 🛠️ Project Structure
```text
├── .github/workflows/
│   └── main.yml         # GitHub Actions CI Workflow
├── node_modules/        # Dynamic packages (ignored by Git)
├── Dockerfile           # Production container assembly configurations
├── Jenkinsfile          # Jenkins Pipeline-As-Code declaration
├── app.js               # Application source logic & configuration
├── app.test.js          # Automated unit testing suite
├── package.json         # Scripts, versions, and application metadata
└── package-lock.json    # Exact dependency lock tree mapping
```

---

## 🏃‍♂️ Getting Started Locally

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org) (v18+ recommended)
* [Docker Desktop](https://docker.com)

### Local Installation
1. Clone the repository:
   ```bash
   git clone https://github.com
   cd jenkins-pipeline-x
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` to verify the application running live.

4. Run the automated testing suite:
   ```bash
   npm test
   ```

---

## 🤖 CI/CD Orchestration Modes

### Option A: Jenkins Pipeline
The project uses the `Jenkinsfile` in the root folder to structure automation execution. Ensure your Jenkins server has the **NodeJS Plugin** installed and configured under **Global Tool Configuration** with the title `NodeJS`.

**Pipeline Progression:**
1. **Dependency Sync:** Automatically triggers `npm install`.
2. **Test Automation:** Runs unit validations.
3. **Docker compilation:** Packages the microservice image file.

### Option B: GitHub Actions (`main.yml`)
The workflow file under `.github/workflows/main.yml` handles native validation automatically inside GitHub.
* Triggers instantly on any `push` or `pull_request` affecting the `main` branch.
* Spins up fresh `ubuntu-latest` execution runners, ensures strict dependency caching, runs the verification engine, and tests the integrity of the `Dockerfile` setup.
