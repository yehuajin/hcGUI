
import Page from "./page";
import { proposals } from "connectors";
import "style/Governance.less";

class IndexPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tabSelected: 1
        }


    }

    componentDidMount() {
        // const now = new Date();
        // const msLastReq = (now - this.props.lastVettedFetchTime);
        // const vettedTooOld = msLastReq > (5 * 60 * 1000); // 5 minutes 
        // if (!this.props.getVettedProposalsAttempt && vettedTooOld) { 
        // if (!this.props.getVettedProposalsAttempt) {
        //     this.props.getVettedProposals && this.props.getVettedProposals();
        // }
 
        this.props.getVettedProposals && this.props.getVettedProposals();
    }

    onTabSelected = (index) => {
        if (index != this.tabSelected) {
            this.setState({ tabSelected: index })
        }
    }
    render() {
        const { tabSelected } = this.state;
        return <Aux>
            <div className="tab-card">
                <Page
                    {...{
                        tabSelected,
                        onTabSelected: this.onTabSelected,
                        router: this.props.router
                    }}
                />
            </div>
        </Aux>
    }

}
export default proposals(IndexPage);