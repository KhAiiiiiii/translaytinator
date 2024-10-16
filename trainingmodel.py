#import libraries
import pandas as pd
from datasets import Dataset
from transformers import T5Tokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments,AutoModel
from sklearn.model_selection import train_test_split
#read the file
dataset = pd.read_csv('genzlingo.csv')
#training data and validation data is taken 
train_dataset, val_dataset = train_test_split(dataset, test_size=0.1, random_state=42)
train_dataset = Dataset.from_pandas(train_dataset[['slang', 'translation']])
val_dataset = Dataset.from_pandas(val_dataset[['slang', 'translation']])
#t5 model and tokenizer established 
model_name = "t5-small"
model = T5ForConditionalGeneration.from_pretrained(model_name)
tokenizer = T5Tokenizer.from_pretrained(model_name, legacy=False)
# preprocessing function
def preprocess_function(examples):
    model_inputs = tokenizer(examples['slang'], max_length=512, padding='max_length', truncation=True)
    with tokenizer.as_target_tokenizer():
        labels = tokenizer(text_target=examples['translation'], max_length=512, padding='max_length', truncation=True)
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs
# tokenize the training dataset(model will recieve as input)
tokenized_train_dataset = train_dataset.map(preprocess_function, batched=True)
# tokenize the validation dataset
tokenized_val_dataset = val_dataset.map(preprocess_function, batched=True)
# training arguments
training_args = TrainingArguments(output_dir='./results',num_train_epochs=3,per_device_train_batch_size=16,save_steps=10_000,save_total_limit=2,learning_rate=5e-5)
#to initalise the trainer
trainer = Trainer(model=model,args=training_args,train_dataset=tokenized_train_dataset,eval_dataset=tokenized_val_dataset)
# start training
trainer.train()
# evaluation
eval_results = trainer.evaluate()
print(eval_results)  
# save the model and tokenizer
model.save_pretrained("./genz_slang_model")
tokenizer.save_pretrained("./genz_slang_model")
# load the model from the checkpoint
model = T5ForConditionalGeneration.from_pretrained(r"C:\Users\gmaha\Desktop\genzslangbot\genz_slang_model\checkpoint-3")
# save the model in the required format
model.save_pretrained("./genz_slang_model")



