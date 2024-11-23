from transformers import pipeline

def summarize_logs(log_text):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summary = summarizer(log_text, max_length=50, min_length=10, do_sample=False)
    return summary[0]['summary_text']
