from typing import List, Union

import numpy as np
import torch
from numpy import ndarray
from transformers import *


class BertParent(object):

    MODELS = {
        'bert-base-uncased': (BertModel, BertTokenizer),
        'bert-large-uncased': (BertModel, BertTokenizer),
        'xlnet-base-cased': (XLNetModel, XLNetTokenizer),
        'xlm-mlm-enfr-1024': (XLMModel, XLMTokenizer),
        'distilbert-base-uncased': (DistilBertModel, DistilBertTokenizer),
        'albert-base-v1': (AlbertModel, AlbertTokenizer),
        'albert-large-v1': (AlbertModel, AlbertTokenizer)
    }

    def __init__(
        self,
        model: str,
        custom_model: PreTrainedModel=None,
        custom_tokenizer: PreTrainedTokenizer=None
    ):
    
        base_model, base_tokenizer = self.MODELS.get(model, (None, None))

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        if custom_model:
            self.model = custom_model.to(self.device)
        else:
            self.model = base_model.from_pretrained(model, output_hidden_states=True).to(self.device)

        if custom_tokenizer:
            self.tokenizer = custom_tokenizer
        else:
            self.tokenizer = base_tokenizer.from_pretrained(model)

        self.model.eval()

    def tokenize_input(self, text: str) -> torch.tensor:
        tokenized_text = self.tokenizer.tokenize(text)
        indexed_tokens = self.tokenizer.convert_tokens_to_ids(tokenized_text)
        return torch.tensor([indexed_tokens]).to(self.device)

    def _pooled_handler(self, hidden: torch.Tensor, reduce_option: str) -> torch.Tensor:
    
        if reduce_option == 'max':
            return hidden.max(dim=1)[0].squeeze()

        elif reduce_option == 'median':
            return hidden.median(dim=1)[0].squeeze()

        return hidden.mean(dim=1).squeeze()

    def extract_embeddings(
        self,
        text: str,
        hidden: Union[List[int], int] = -2,
        reduce_option: str ='mean',
        hidden_concat: bool = False
    ) -> torch.Tensor:

        tokens_tensor = self.tokenize_input(text)
        pooled, hidden_states = self.model(tokens_tensor)[-2:]

        # deprecated temporary keyword functions.
        if reduce_option == 'concat_last_4':
            last_4 = [hidden_states[i] for i in (-1, -2, -3, -4)]
            cat_hidden_states = torch.cat(tuple(last_4), dim=-1)
            return torch.mean(cat_hidden_states, dim=1).squeeze()

        elif reduce_option == 'reduce_last_4':
            last_4 = [hidden_states[i] for i in (-1, -2, -3, -4)]
            return torch.cat(tuple(last_4), dim=1).mean(axis=1).squeeze()

        elif type(hidden) == int:
            hidden_s = hidden_states[hidden]
            return self._pooled_handler(hidden_s, reduce_option)

        elif hidden_concat:
            last_states = [hidden_states[i] for i in hidden]
            cat_hidden_states = torch.cat(tuple(last_states), dim=-1)
            return torch.mean(cat_hidden_states, dim=1).squeeze()

        last_states = [hidden_states[i] for i in hidden]
        hidden_s = torch.cat(tuple(last_states), dim=1)

        return self._pooled_handler(hidden_s, reduce_option)

    def create_matrix(
        self,
        content: List[str],
        hidden: Union[List[int], int] = -2,
        reduce_option: str = 'mean',
        hidden_concat: bool = False
    ) -> ndarray:

        return np.asarray([
            np.squeeze(self.extract_embeddings(
                t, hidden=hidden, reduce_option=reduce_option, hidden_concat=hidden_concat
            ).data.cpu().numpy()) for t in content
        ])

    def __call__(
        self,
        content: List[str],
        hidden: int= -2,
        reduce_option: str = 'mean',
        hidden_concat: bool = False
    ) -> ndarray:
        return self.create_matrix(content, hidden, reduce_option, hidden_concat)
