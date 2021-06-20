from typing import List

from spacy.lang.en import English


class SentenceHandler(object):

    def __init__(self, language=English):
    
        self.nlp = language()

        try:
            # Supports spacy 2.0
            self.nlp.add_pipe(self.nlp.create_pipe('sentencizer'))
            self.is_spacy_3 = False
        except:
            # Supports spacy 3.0
            self.nlp.add_pipe("sentencizer")
            self.is_spacy_3 = True

    def sentence_processor(self, doc, min_length: int = 40, max_length: int = 600) -> List[str]:
        
        to_return = []

        for c in doc.sents:
            if max_length > len(c.text.strip()) > min_length:

                if self.is_spacy_3:
                    to_return.append(c.text.strip())
                else:
                    to_return.append(c.string.strip())

        return to_return

    def process(self, body: str, min_length: int = 40, max_length: int = 600) -> List[str]:
        
        doc = self.nlp(body)
        return self.sentence_processor(doc, min_length, max_length)

    def __call__(self, body: str, min_length: int = 40, max_length: int = 600) -> List[str]:
       
        return self.process(body, min_length, max_length)
