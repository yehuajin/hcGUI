import { FormattedMessage as T } from "react-intl";
import SendTabPage from './page';
import { omniTradeSend } from "connectors";



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(this.props);
  }

  getInitialState(props) {
    return {
      address: null,
      asset: null,
      amountforsale: null,
      amountdesired: null,
      showConfirmSendModal: false,
      propertiddesired: null,
    };
  }
  onCancelModal = () => {
    this.setState({ showConfirmSendModal: false });
  }

  onChangeAmountforsale = (e) => {
    const value = e.target.value;
    if (value !== this.state.amountforsale) {
      this.setState({ amountforsale: value });
    }
  }
  onChangeAmountdesired = (e) => {
    const value = e.target.value;
    if (value !== this.state.amountdesired) {
      this.setState({ amountdesired: value });
    }
  }



  getAmountforsaleError(amount) {
    if (amount && isNaN(amount)) return <T id="send.errors.invalidAmount" m="*Please enter a valid amount" />;
    if (amount && amount <= 0) return <T id="send.errors.negativeAmount" m="*Please enter a valid amount (> 0)" />;
  }

  onAddressChange = (address) => {
    if (address !== this.state.address) {
      this.setState({ address })
    }
  }

  onAssetsChange = (asset) => {
    if (asset !== this.state.asset) { 
      const { listproperties } = this.props; 
      const properties = listproperties ? listproperties.filter(item => item.ecosystem == this.state.ecosystem && item.name != asset.name) : null;
  
      this.setState({ asset, address: asset.addressData[0], listproperties: properties, })

    }
  }

  getIsValid() {
    const { address, asset, amountforsale, propertiddesired, amountdesired } = this.state;
    return !!(address && asset && amountforsale && (parseFloat(amountforsale) <= parseFloat(address.balance)) && amountdesired && propertiddesired);
  }
  onSend = () => {
    if (!this.getIsValid()) return;
    this.setState({ showConfirmSendModal: true })
  }

  onSubmit = () => {
    if (!this.getIsValid()) return;

    const { sendTrade } = this.props;
    const { address, asset, amountforsale, propertiddesired, amountdesired } = this.state;
    sendTrade && sendTrade({
      fromaddress: address.address, propertyidforsale: asset.propertyid, amountforsale,
      propertiddesired: propertiddesired.propertyid, amountdesired
    }, () => {
      this.setState({ showConfirmSendModal: false });
      this.props.router.goBack();
    });

  } 

  onClearTransaction = () => {
    this.setState(this.getInitialState(this.props));
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.walletAssetsBalances != this.props.walletAssetsBalances) {
      this.setState(this.getInitialState(nextProps));
    }
  }

  onChangePropertiddesired = (property) => {
    if (this.state.propertiddesired != property) {
      this.setState({ propertiddesired: property })
    }

  }


  onEcosystemChanged = (value) => {
    const { walletAssetsBalances, listproperties } = this.props;
 
    const assets = walletAssetsBalances ? walletAssetsBalances.filter(item => item.ecosystem == value) : null;
    let properties = listproperties ? listproperties.filter(item => item.ecosystem == value ) : null; 
    if(assets && assets.length>0 && properties && properties.length>0){
      properties = properties.filter(item=>item.name != assets[0].name)
    }

    this.setState({
      ecosystem:value,
      walletAssetsBalances: assets,
      listproperties: properties,
      address: assets && assets.length > 0 ? assets[0].addressData[0] : null,
      asset: assets && assets.length > 0 ? assets[0] : null,
      propertiddesired: properties && properties.length > 0 ? properties[0] : null,
    })
  }
  render() {
    const { address, asset, amountforsale, amountdesired, showConfirmSendModal, propertiddesired, walletAssetsBalances, listproperties } = this.state;
    const isValid = this.getIsValid();
    const {router} = this.props;
    return <div className="tab-card"> <SendTabPage {...{
      onEcosystemChanged: this.onEcosystemChanged,

      address,
      addressList: asset ? asset.addressData : null,
      onAddressChange: this.onAddressChange,

      asset,
      assetsList: walletAssetsBalances,
      onAssetsChange: this.onAssetsChange,

      listproperties,
      propertiddesired,
      onChangePropertiddesired: this.onChangePropertiddesired,



      amountforsale,
      onChangeAmountforsale: this.onChangeAmountforsale,
      amountforsaleError: this.getAmountforsaleError(amountforsale),

      amountdesired,
      onChangeAmountdesired: this.onChangeAmountdesired,
      amountdesiredError: this.getAmountforsaleError(amountdesired),


      isValid,

      onSend: this.onSend,
      showConfirmSendModal,
      onCancelModal: this.onCancelModal,
      onSubmit: this.onSubmit,
      router

    }} /></div>
  }
}

export default omniTradeSend(Index);
