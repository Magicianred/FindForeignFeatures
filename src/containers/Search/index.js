import React, { Component } from 'react';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import Keywords from '../Keywords';
import KeywordRecommendations from '../KeywordRecommendations';
import Genres from '../Genres';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection:[],
            keywords:[],
            rawKeywordRecommendations: [],
            genres:[]
        
        }
    }

    componentDidMount(){
        if (this.state.selection.length === 0 && this.props.location.selection !== undefined) {
            this.setState({ selection: this.props.location.selection })
        }
        if (this.state.keywords.length === 0 && this.props.location.keywords !== undefined) { 
            this.setState({ keywords: this.props.location.keywords })
        }
    }

    rawKeywordHandler = (results) => {
        this.setState({ rawKeywordRecommendations: results })
    }

    genreHandler = (results) => {
        this.setState({ genres: results })
    }

    searching(input, input2) {
        if (this.state.keywords.length > 0) {
            return (
                <div>
                    <Loading />
                    <h2><Message text={input} /></h2>
                        <Message text={input2} />
                </div>
            )
        }
    }

    render() {

        let input = "<div id='wow'>Searching...</div>"
        let input2 = "<div id = 'text'>This can take up to 10 seconds.</div>"

        return (
            <div>
            {this.state.keywords.length ===0 &&
                <Keywords item={this.props} />
            }
            {this.state.keywords.length !== 0 &&
                this.searching(input, input2)}

            {this.state.keywords.length !== 0 && this.state.rawKeywordRecommendations.length === 0 &&
                <KeywordRecommendations keywords={this.state.keywords} type={this.props.match.params.mediaType} 
                        rawKeywordHandler={this.rawKeywordHandler}/>  
            }
            {this.state.selection.length !== 0 && this.state.genres.length === 0 &&
                    <Genres item={this.state.selection} genreHandler={this.genreHandler}
                    />
            }

            {console.log(this.state.genres)}
            </div>
        )
    }
}

export default Search