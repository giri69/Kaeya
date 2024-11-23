import datetime
from flask import request, jsonify
from app import app
from elasticsearch import Elasticsearch
import requests

LOGSTASH_URL = "http://logstash:5044"

def get_elasticsearch_client():
    """Returns an Elasticsearch client."""
    try:
        es = Elasticsearch(["http://elasticsearch:9200", "http://localhost:9200"])
        return es
    except Exception as e:
        raise ConnectionError(f"Error connecting to Elasticsearch: {e}")

# Existing Routes
@app.route('/ingest', methods=['POST'])
def ingest_log():
    """Ingest logs into Logstash."""
    log = request.json
    try:
        response = requests.post(LOGSTASH_URL, json=log)
        return jsonify({"status": "success", "logstash_response": response.text})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route('/search', methods=['GET'])
def search_logs():
    """Search logs from Elasticsearch."""
    try:
        es = get_elasticsearch_client()
        query = {"query": {"match_all": {}}}
        response = es.search(index="logs", body=query)
        return jsonify(response.body)
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route('/test-es', methods=['GET'])
def test_elasticsearch():
    """Test Elasticsearch connection."""
    try:
        es = get_elasticsearch_client()
        if es.ping():
            return jsonify({"status": "success", "message": "Elasticsearch is connected"})
        else:
            return jsonify({"status": "error", "message": "Elasticsearch connection failed"}), 500
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route('/login-stats', methods=['GET'])
def get_login_stats():
    """Fetch count of failed and successful logins."""
    try:
        es = get_elasticsearch_client()
        query = {
            "size": 0,
            "aggs": {
                "login_status": {
                    "terms": {"field": "event.type.keyword"}
                }
            }
        }
        response = es.search(index="logs", body=query)
        login_stats = {
            bucket['key']: bucket['doc_count']
            for bucket in response['aggregations']['login_status']['buckets']
        }
        return jsonify({"status": "success", "data": login_stats})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route('/honeypot-analysis', methods=['GET'])
def honeypot_analysis():
    """Analyze honeypot logs for suspicious activity."""
    try:
        es = get_elasticsearch_client()
        query = {
            "size": 0,
            "aggs": {
                "malicious_ips": {
                    "terms": {
                        "field": "source_ip.keyword",
                        "size": 10,
                        "order": {"_count": "desc"}
                    }
                }
            }
        }
        response = es.search(index="honeypot_logs", body=query)
        malicious_ips = [
            {"ip": bucket['key'], "count": bucket['doc_count']}
            for bucket in response['aggregations']['malicious_ips']['buckets']
        ]
        return jsonify({"status": "success", "malicious_ips": malicious_ips})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route('/ransomware-detection', methods=['GET'])
def ransomware_detection():
    """Detect ransomware activities."""
    try:
        es = get_elasticsearch_client()
        query = {
            "query": {
                "bool": {
                    "should": [
                        {"match": {"event.type": "file_encryption"}},
                        {"match": {"event.type": "mass_file_rename"}}
                    ]
                }
            }
        }
        response = es.search(index="system_logs", body=query)
        ransomware_events = [
            hit['_source'] for hit in response['hits']['hits']
        ]
        return jsonify({"status": "warning" if ransomware_events else "safe",
                        "ransomware_events": ransomware_events})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route('/system-log-analysis', methods=['GET'])
def system_log_analysis():
    """Analyze system logs."""
    try:
        es = get_elasticsearch_client()
        query = {
            "size": 0,
            "aggs": {
                "error_logs": {
                    "terms": {"field": "log_level.keyword"}
                }
            }
        }
        response = es.search(index="system_logs", body=query)
        error_logs = {
            bucket['key']: bucket['doc_count']
            for bucket in response['aggregations']['error_logs']['buckets']
        }
        return jsonify({"status": "success", "error_logs": error_logs})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route('/ddos-detection', methods=['GET'])
def ddos_detection():
    """Detect potential DDoS attacks."""
    try:
        es = get_elasticsearch_client()
        query = {
            "size": 0,
            "aggs": {
                "high_request_ips": {
                    "terms": {
                        "field": "clientip.keyword",
                        "size": 10,
                        "order": {"_count": "desc"}
                    }
                }
            }
        }
        response = es.search(index="logs", body=query)
        high_request_ips = response['aggregations']['high_request_ips']['buckets']
        suspicious_ips = [
            {"ip": bucket['key'], "total_requests": bucket['doc_count']}
            for bucket in high_request_ips if bucket['doc_count'] > 1000
        ]
        return jsonify({"status": "warning" if suspicious_ips else "safe",
                        "suspicious_ips": suspicious_ips})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500