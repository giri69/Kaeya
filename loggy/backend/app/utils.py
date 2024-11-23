import re

def mask_sensitive_data(log):
    # Example: Mask email addresses
    return re.sub(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', '***', log)
