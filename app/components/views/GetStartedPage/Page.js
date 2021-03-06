import { HcashOrgLoading } from "indicators";
import "style/GetStarted.less";
import "style/Layout.less";

const Page = ({ Header, Body, ...props }) => {

  const hideLogo = props.startupError
    || props.isOpenWalletPublicInputRequest
    || props.isOpenWalletPrivateInputRequest
    || props.isInputRequest
    || props.showSettings
    || props.showLogs;

  return (
    <div className="page-view inverted-colors">
      <Header {...props} />
      <div className="page-content-fixed">
        <HcashOrgLoading
          hidden={hideLogo}
          className="get-started-loading"
        />
        <Body {...props} /> 
      </div>
    </div>
  );
};
export default Page;
