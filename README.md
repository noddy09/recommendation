# recommendation
Recommendation system prototype

## Ready backend server
- Install system required packages first:
```sh
sudo apt install python3-dev \
    python3-pip \
    virtualenv \
    postgresql-12 \
    libpq-dev \
    nginx
```


- Create virtual enviroment and install required python packages:
```sh
virtualenv -p python3 env
activate env/bin/activate
pip install -r docs/pip_requirement.txt
```


- Ready your backend:
```sh
cd backend/recommend/

# Database related
python manage.py makemigrations
python manage.py migrate

# Static file related
python manage.py collectstatic

# Create new root user for your backend's admin page login.
python manage.py createsuperuser
# Put down new root user credentials to login to admin webpages.

```


- Roll your backend:
```sh
# Run your server in very basic manner:
python manange.py runserver
```


## Ready frontend
- Ensure you have install `npm`,`node` onto your machine and then:
```sh
cd frontend/recommend-fe/
npm install -g --save
npm start
```
