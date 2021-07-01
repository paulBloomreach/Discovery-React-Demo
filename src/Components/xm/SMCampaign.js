import React, {useContext} from 'react';
import {SearchResultsContext} from '../../Services/SearchResultsProvider';

/*
  A generic place to display things like personalized banners.  This is currently
  displaying any campaign / assets that may be part of the search results (Campaigns
  and assets created in SM Tools).

  Note: what we get back from the API call for assets are HTML content.  The right
  way to render this is via the scary sounding 'dangerouslySetInnerHTML' method.

  There's some redundency in the code, but I figured I would leave it for now because
  I'm not sure what this will look like down the road as we might include content
  coming from other places and the logic below might be more relevant.
*/

const SMCampaign = () => {
  const { campaign } = useContext(SearchResultsContext);

  // if a campaign object comes back in the search results, display it
  if (campaign) {
    let assetType = campaign.bannerType;

    if (assetType === 'image_url') {
      let imgStr = campaign.htmlText;
      //console.log("Asset (image): ", imgStr)
      return (
        <div className='logo'>
          <div dangerouslySetInnerHTML={{ __html: imgStr }} />
        </div>
      );
    } else if (assetType === 'html') {
      let htmlStr = campaign.htmlText;
      //console.log("Asset (html): ", htmlStr)
      return (
        <div className='logo'>
          <div dangerouslySetInnerHTML={{ __html: htmlStr }} />
        </div>
      );
    } else if (assetType === 'banner_url') {
      let bannerStr = campaign.htmlText;
      //console.log("Asset (banner_url): ", bannerStr)
      return (
        <div className='logo'>
          <div dangerouslySetInnerHTML={{ __html: bannerStr }} />
        </div>
      );
    } else {
      console.log('Unsupported asset type in campaign: ', campaign);
    }
  }

  return <></>;
};

export default SMCampaign;
