pipeline {
    agent any 

    tools {
        // Must match the NodeJS tool name inside 'Manage Jenkins' -> 'Tools'
        nodejs 'NodeJS' 
    }

    environment {
        DOCKER_HUB_USER = 'yourdockerhubusername' // Change to your actual Docker Hub username
        IMAGE_NAME      = 'cicd-sample-project'
        IMAGE_TAG       = "${BUILD_NUMBER}"
    }

    stages {
        stage('📦 Install Dependencies') {
            steps {
                echo 'Installing Application Dependencies...'
                sh 'npm install'
            }
        }

        stage('🧪 Run Unit Tests') {
            steps {
                echo 'Executing Test Suite...'
                sh 'npm test' 
            }
        }

        stage('🐳 Build Container Image') {
            steps {
                echo 'Building Docker Image...'
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest ."
            }
        }

        stage('🚀 Publish to Registry') {
            steps {
                echo 'Publishing Image to Docker Hub...'
                // Uses Jenkins secure credentials manager
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('🌐 Deploy Application') {
            steps {
                echo 'Deploying Application container...'
                // Stops and deletes the old container version if running, then fires up the new one
                sh "docker stop ${IMAGE_NAME} || true && docker rm ${IMAGE_NAME} || true"
                sh "docker run -d -p 3000:3000 --name ${IMAGE_NAME} ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
            }
        }
    }

    post {
        always {
            cleanWs() // Cleans the Jenkins build workspace folder to save server space
        }
    }
}
