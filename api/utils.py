"""General API utilities."""

import json


def get_json_payload(request):
    """Return payload as dict."""
    return json.loads(request.body.decode('utf-8'))
