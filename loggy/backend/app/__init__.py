from flask import Flask
from flask_cors import CORS
from elasticsearch import Elasticsearch
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

# Attempt to connect to Elasticsearch
try:
    es_hosts = ["http://elasticsearch:9200", "http://localhost:9200"]
    es = Elasticsearch(es_hosts)
    if not es.ping():
        raise ValueError("Elasticsearch connection failed.")
    print("Connected to Elasticsearch!")
except Exception as e:
    print(f"Error connecting to Elasticsearch: {e}")

from app.routes import *  # Import Flask routes
