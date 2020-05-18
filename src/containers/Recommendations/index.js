import React, {Component} from 'react';
import Keywords from '../Keywords';
import Genres from '../Genres';
import Message from '../../components/Message';
import RecommendationsList from '../../components/RecommendationsList';

class Recommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawKeywordRecommendations:[],
            comparedRecommendations: [],
            sortedRecommendations: [],
            noResults: false,
            sorted: false,
        }
    }

    componentDidUpdate() {
        if (this.state.comparedRecommendations.length !== 0 && this.state.sorted === false) {
            this.returnSortedResults(this.state.comparedRecommendations)
        }
    }

    rawKeywordHandler = (results) => {
        console.log(results.length)
        results.length !== 0 ? this.setState({ rawKeywordRecommendations: results }) : this.setState({ noResults: true })
        
    }

    comparedHandler = (results) => {
        this.setState({ comparedRecommendations: results }) 
    }

    sortResults=(arr)=>{
        let sorted =  arr.sort((a, b) => (b.returns > a.returns) ? 1 : ((a.returns > b.returns)? -1 : 0))
        return sorted
    }

    returnSortedResults = (arr)=>{
        let sorted = this.sortResults(arr)
        this.setState({ sortedRecommendations: sorted });
        this.setState({ sorted: true })
    }
    
    render(){
        let input = "Some things are one of a kind! No similar films were found."
        let input2 = "Try using different keywords or search for another film."

        return(
            <div>
                <Keywords movie = {this.props.movie} isFetching = {this.props.isFetching} rawKeywordHandler ={this.rawKeywordHandler}/>
                {this.state.noResults === false &&
                <Genres movie={this.props.movie} isFetching={this.props.isFetching} comparedHandler={this.comparedHandler} keywordRecs = {this.state.rawKeywordRecommendations}/>
                }
                {this.state.noResults === true &&
                    <h1><Message text={input} /></h1> &&
                    <h3><Message text={input2} /></h3>}
                {this.state.sortedRecommendations.length !==0 && this.state.noResults === false &&
                    <RecommendationsList list={this.state.sortedRecommendations.slice(0,50)}/>}
            </div >  
        )
    }
}

export default Recommendations;