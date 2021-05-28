DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../
sudo docker-compose -f docker/docker-compose.dev.yml --env-file .dev.env down