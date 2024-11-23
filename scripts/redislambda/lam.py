import json
import redis
from urllib.parse import urlparse

# Parse Redis connection string
REDIS_URL = "rediss://red-ct1284rtq21c73ekqea0:En6Gg5R1ZvJp2zXYnpEy5IGFbQ8mE6cb@singapore-redis.render.com:6379"
parsed_url = urlparse(REDIS_URL)

# Extract credentials and details from the connection string
redis_host = parsed_url.hostname
redis_port = parsed_url.port
redis_password = parsed_url.password
redis_ssl = parsed_url.scheme == "rediss"  # SSL enabled for "rediss"

# Initialize Redis connection
try:
    redis_client = redis.StrictRedis(
        host=redis_host,
        port=redis_port,
        password=redis_password,
        ssl=redis_ssl,
        decode_responses=True  # Automatically decode responses to strings
    )
except Exception as e:
    print(f"Error connecting to Redis: {str(e)}")
    raise e


def lambda_handler(event, context):
    """
    AWS Lambda handler function.

    Args:
        event: The input data, containing `serviceId` and associated data.
        context: AWS Lambda context object (not used here).

    Returns:
        A JSON response with success or error information.
    """
    try:
        # Parse input event
        body = json.loads(event.get("body", "{}"))
        service_id = body.get("serviceId")
        data = body.get("data")

        if not service_id or not data:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Missing `serviceId` or `data` in request body."})
            }

        # Save to Redis (key: serviceId, value: data)
        redis_client.set(service_id, json.dumps(data))

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Data saved successfully.",
                "serviceId": service_id
            })
        }

    except redis.RedisError as e:
        print(f"Redis error: {str(e)}")
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed to connect to Redis.", "error": str(e)})
        }
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "An unexpected error occurred.", "error": str(e)})
        }
