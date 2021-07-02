import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Flex } from '../../components/flex';
import { PayPalButton } from "react-paypal-button-v2";

const markDown = `
# Summary API

A RESTful API powers the UI behind this project. One can access the API with the following url: https://api.smrzr.io/v1 or https://private-api.smrzr.io/v1. The private api allows for unlimited requests. To access the private api, please click the button at the bottom of the page. You will immediately get an email within 5 minutes that includes the api key.

### Query Params

To summarize a piece of text, you can send a POST request to https://api.smrzr.io/v1/summarize or https://private-api.smrzr.io/v1/summarize with a raw/text content-type with the full summary. You can also tweak the following parameters:

* num_sentences: The number of sentences you want for the summary.
* min_length: The minimum char length that a sentence needs to be in order to qualify in the summary.
* max_length: The maximum char length that a sentence needs to be in order to qualify in the summary.
* algorithm: This corresponds to the clustering algorithm to use. Currently, only \`kmeans\` and \`gmm\` are supported.

### Credentials Setup

If you are using the private endpoints, you will need to use an api key. Below shows an example with your api key.
\`\`\`python 
import requests

headers = {
    "api_token": "<your_private_key>"
}

body = '''
<Your text you want to summarize>
'''

resp = requests.post(
    'https://private-api.smrzr.io/v1/summarize?num_sentences=5&algorithm=kmeans&min_length=40&max_length=500', 
    headers=headers,
    data=body
)

\`\`\`


### API Python Example with Query Params
\`\`\`python 
import requests
\`\`\`

\`\`\`
body = '''
<Your text you want to summarize>
'''
\`\`\`

\`\`\`
resp = requests.post('https://api.smrzr.io/v1/summarize?num_sentences=5&algorithm=kmeans&min_length=40&max_length=500', data=body)
\`\`\`

\`\`\`
summary = resp.json()['summary']

\`\`\`

## Summarize New Articles

The summarizer API also includes a place where you can summarize news articles. This includes a custom text processor to attempt to remove unrelated content before summarization. The endpoint is https://api.smrzr.io/v1/summarize/news . The same arguments can be used as above with this endpoint. 

### News Summary Example

Below shows an example of using the news summary endpoint. Again, if you want to use the private endpoints you just need to replace https://api.smrzr.io/v1 with https://private-api.smrzr.io/v1. 

\`\`\`python
import requests
json_body = {
    "url": "news_url"
}

resp = requests.post("https://api.smrzr.io/v1/summarize/news?num_sentences=5&min_length=40", json=json_body).json()
summary = resp['summary']
\`\`\`


## More Extensive use of the API

Currently the main API has some service limits to keep it free for everyone and to attempt to have as low of server costs as possible. 
However, we have had a few individuals/companies reach out about more use of the API such as more requests, faster response times, different models/parameters, etc.
We have private endpoints that require a token for these use cases. Due to the size of models, we ask for $5 a month to help cover server costs. 
If you are interested, please click on the link below, and once completed, you should receive an api key via email within 5 to 10 minutes. If any issues 
or questions arise, please email me at derekmiller1020@gmail.com .

`;


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


const About = () => (<div>
    <ReactMarkdown children={markDown}>
    </ReactMarkdown>

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
</div>);

export default About;
