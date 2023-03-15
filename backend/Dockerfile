FROM  python:3.8
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
RUN pip3 install flask
RUN pip3 install flask_login
RUN pip3 install pymongo
COPY . . 
EXPOSE 5001