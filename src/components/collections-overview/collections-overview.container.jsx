import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectos";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from '../collections-overview/collections-overview.component'

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
})

const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
  )(CollectionsOverview) 

export default CollectionOverviewContainer