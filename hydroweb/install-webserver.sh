# Install and set up webserver

BASE_DIR=`dirname $(pwd)`

# Installation
echo "Installing packages..."
sudo apt install -y nginx
pip install gunicorn

# Setup nginx
echo "Setting up Nginx webserver..."
cd /etc/nginx/sites-available
sudo ln -s "${BASE_DIR}/hydroweb/hydroweb.conf"
cd ../sites-enabled
sudo ln -s /etc/nginx/sites-available/hydroweb.conf hydroweb

# Setup Gunicorn
echo "Setting up Gunicorn WSGI server..."
cd /etc/systemd/system/
sudo ln -s "${BASE_DIR}/hydroweb/hydroweb.service"
sudo ln -s "${BASE_DIR}/hydroweb/hydroweb.socket"
sudo systemctl enable hydroweb.service
sudo systemctl enable hydroweb.socket
sudo systemctl start hydroweb.socket

cd $BASE_DIR
