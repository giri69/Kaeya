from flask import Flask
from flask_cors import CORS
from elasticsearch import Elasticsearch
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})  # Allow React frontend access

# Initialize Elasticsearch client with connection check
try:
    es = Elasticsearch(hosts=[os.getenv("ELASTICSEARCH_URL", "http://localhost:9200")])
    if not es.ping():
        raise ValueError("Elasticsearch connection failed.")
except Exception as e:
    print(f"Error connecting to Elasticsearch: {e}")
    es = None  # Handle gracefully in the app

from app.routes import *  # Import all routes
