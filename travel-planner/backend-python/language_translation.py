import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

# Hugging Face API Token
HUGGINGFACE_API_TOKEN = "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"

# Load the translation model
translation_model_name = "ai4bharat/indictrans2-indic-en-1B"
tokenizer = AutoTokenizer.from_pretrained(
    translation_model_name, 
    trust_remote_code=True, 
    use_auth_token=HUGGINGFACE_API_TOKEN
)
translation_model = AutoModelForSeq2SeqLM.from_pretrained(
    translation_model_name, 
    trust_remote_code=True, 
    use_auth_token=HUGGINGFACE_API_TOKEN
)

# Text inputs
input_sentences = [
    "जब मैं छोटा था, मैं हर रोज़ पार्क जाता था।",
    "அவள் ஒரு புத்தகத்தை படிக்கிறாள்.",
    "వారంతా కలసి ఒక మంచి సినిమా చూశారు.",
]
DEVICE = "cpu"
# Specify source and target languages
src_lang, tgt_lang = "hin_Deva", "eng_Latn"  # Replace `hin_Deva` with appropriate source language for each input

# Process the batch
processed_batch = tokenizer(
    input_sentences, truncation=True, padding="longest", return_tensors="pt"
).to(DEVICE)

# Generate translations
with torch.no_grad():
    output = translation_model.generate(
        **processed_batch, max_length=256, num_beams=5, num_return_sequences=1
    )

# Decode translations
translations = tokenizer.batch_decode(
    output, skip_special_tokens=True, clean_up_tokenization_spaces=True
)

# Print results
for input_sentence, translation in zip(input_sentences, translations):
    print(f"Input Sentence: {input_sentence}")
    print(f"Translation: {translation}\n")
