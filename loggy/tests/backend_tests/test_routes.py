import unittest
from app import app

class TestRoutes(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_ingest(self):
        response = self.client.post('/ingest', json={"message": "test log"})
        self.assertEqual(response.status_code, 200)
