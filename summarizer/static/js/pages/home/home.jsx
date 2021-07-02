import React, { useState, useRef} from 'react';
import startText from './startText';
import Button from '../../components/button';
import Input from '../../components/input';
import Loader from '../../components/loader';
import { Flex } from '../../components/flex';
import TextArea from '../../components/textarea';
import Hr from '../../components/hr';
import { PayPalButton } from "react-paypal-button-v2";

const percentChange = (val1, val2) => {
  return Math.abs(Math.round(((val2 - val1) / val1) * 100));
}

const Home = () => {
  const [inputText, setInputText] = useState(startText);
  const [numInputWords, setNumInputWords] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [numSummaryWords, setNumSummaryWords] = useState(0);

  const [configuredSentences, setConfiguredSentences] = useState(5);
  const [isLoading, setLoading] = useState(false);

  const summaryRef = useRef();

  const paypalSubscribe = (data, actions) => {
    return actions.subscription.create({
      'plan_id': "P-1CA99918YU731230MMACKNRI",
    });
  };

  const paypalOnError = (err) => {
    console.log("Error")
  };

  const paypalOnApprove = (data, detail) => {
    // call the backend api to store transaction details
    alert("Payment Approved. You should receive an email shortly confirming your api token.");
  };

  const summarizeText = async text => {
    setLoading(true);
    setSummaryText("");
    const url = `https://api.smrzr.io/v1/summarize?&num_sentences=${configuredSentences}`
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'raw/text',
      },
      body: text
    };
    const response = await fetch(url, settings);
    const { summary } = await response.json();

    setLoading(false);
    setSummaryText(summary);
    setNumInputWords(inputText.split(' ').length);
    setNumSummaryWords(summary.split(' ').length);

    summaryRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <h3>Summarize Text</h3>
      <Flex column>
        <TextArea value={inputText} onChange={event => setInputText(event.currentTarget.value)} />
        <Flex justifyBetween alignStart>
          <Input
            type="number"
            min="5"
            label="Number of sentences:"
            onChange={(event) => setConfiguredSentences(event.currentTarget.value)} value={configuredSentences} />
          <Button align="flex-end" onClick={() => summarizeText(inputText)}>
            Summarize
          </Button>
        </Flex>
      </Flex>
      { isLoading && (
        <Flex column alignCenter>
          <Loader />
        </Flex>
      )}
      { summaryText && (
        <>
          <Flex ref={summaryRef}>
            <p>Text reduced by <b>{percentChange(numInputWords, numSummaryWords)}%</b> ({numInputWords} to {numSummaryWords} words)</p>
          </Flex>
          <Hr />
          <div>{summaryText}</div>
          <Hr />
        </>
      )}

      <Flex column alignLeft content>
        <Hr></Hr>
        <h3 id="extractive-text-summarization-using-bert">Extractive Text Summarization using BERT</h3>
        <p>This website is a demo of the bert-extractive-summarizer tool located here: <a href="https://github.com/dmmiller612/bert-extractive-summarizer">https://github.com/dmmiller612/bert-extractive-summarizer</a>. This tool utilizes a neural network approach called <a href="https://arxiv.org/abs/1810.04805">BERT</a> to run extractive summarizations. This works by first embedding the sentences with BERT, then running a clustering algorithm, finding the sentences that are closest to the cluster&#39;s centroids. This library also uses coreference techniques to resolve words in summaries that need more context.</p>
        <p>For reference to the implementation details of this project, one can view the research paper here: <a href="https://arxiv.org/abs/1906.04165">Leveraging BERT for extractive text summarization on lectures</a>.</p>
        <h3 id="api">API</h3>
        <p>A RESTful API powers the UI behind this project. One can access the API with the following url: <a href="https://api.smrzr.io/v1">https://api.smrzr.io/v1</a> or through the private api at <a href="https://private-api.srmzr.io/v1">https://private-api.srmzr.io/v1</a>. Currently the main API has strict service limits to keep it free for everyone and to attempt to have as low of server costs as possible. However, we have had a few individuals/companies reach out about unlimited use of the API such as unlimited requests, large concurrency, different models/parameters, etc. </p>
        <p>We have private endpoints that require a token for these use cases. Due to the size of models, we ask for $5 a month to help cover server costs. We have provided an automatic setup of the api token, once you have set up your subscription with PayPal by clicking the button below. Once completed, you will receive an email with your api token. If you have any questions, please email derekmiller1020@gmail.com.</p>
      
      </Flex>

      <Flex column alignCenter>
        <div>
          <PayPalButton 
            options={{
              clientId: 'AeG82Z_0uRkDsAj8Ov1ZyvLPj7pppSvKsTSciAS0O9zo95qnudri4iWQ1070ZH-1JWwU0MrJN-Dlmamf',
              vault:true
            }}
            amount = "5"
            currency = "USD"
            createSubscription={paypalSubscribe}
            onApprove={paypalOnApprove}
            catchError={paypalOnError}
            onError={paypalOnError}
            onCancel={paypalOnError}
          />
        </div>
      </Flex>
    </>
  )
};

export default Home;
