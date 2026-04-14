# 1. Build with a version tag AND a commit SHA for traceability
VERSION="1.0.0"
COMMIT_SHA=$(git rev-parse --short HEAD)

docker build -t aryan/api-service:$VERSION .
docker tag aryan/api-service:$VERSION aryan/api-service:$COMMIT_SHA

# 2. Push to the registry (requires docker login)
docker push aryan/api-service:$VERSION
docker push aryan/api-service:$COMMIT_SHA

echo "🚀 Image v$VERSION pushed successfully!"