from flask import request, jsonify
import requests
from app import app  # Use the app object defined in __init__.py

LOGSTASH_URL = "http://localhost:5044"  # Logstash HTTP input endpoint
ELASTICSEARCH_URL = "http://localhost:9200/logs/_search"  # Elasticsearch endpoint

def is_logstash_running():
    """
    Check if Logstash is running by attempting to connect to the configured URL.
    """
    try:
        response = requests.get(LOGSTASH_URL, timeout=2)
        # Logstash HTTP input does not respond to GET requests, so expect connection success or 404.
        if response.status_code in [200, 404]:
            return True
    except requests.exceptions.ConnectionError:
        return False
    except Exception as e:
        print(f"Unexpected error while checking Logstash status: {str(e)}")
        return False
    return False


@app.route('/ingest', methods=['POST'])
def ingest_log():
    """
    Endpoint to ingest logs into Logstash.
    """
    log = request.json
    if not log:
        return jsonify({"status": "error", "message": "No log data provided"}), 400

    if not is_logstash_running():
        return jsonify({"status": "error", "message": "Logstash is not running"}), 500

    try:
        response = requests.post(LOGSTASH_URL, json=log)
        return jsonify({
            "status": "success",
            "logstash_response": response.text,
            "logstash_status_code": response.status_code
        })
    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "error": f"Failed to send data to Logstash: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500


@app.route('/search', methods=['GET'])
def search_logs():
    """
    Endpoint to query logs from Elasticsearch.
    """
    query = {
        "query": {
            "match_all": {}
        }
    }
    try:
        response = requests.post(ELASTICSEARCH_URL, json=query)
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "error": f"Failed to query Elasticsearch: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint to verify the Flask app is running.
    """
    return jsonify({"status": "ok"})


@app.route('/', methods=['GET'])
def home():
    """
    Welcome endpoint.
    """
    return "Welcome to the Logstash API!"


@app.route('/logstash/health', methods=['GET'])
def logstash_health_check():
    """
    Check if Logstash is running and return its status.
    """
    if is_logstash_running():
        return jsonify({"status": "ok", "message": "Logstash is running"})
    else:
        return jsonify({"status": "error", "message": "Logstash is not running"}), 500
