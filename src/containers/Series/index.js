import React, {Component} from 'react';
import 'whatwg-fetch'
import SeriesList from '../../components/SeriesList'

const API_KEY = `${process.env.REACT_APP_DB_API_KEY}`

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}


class Series extends Component{
    constructor(props) {
    super(props);

    this.state =  { series:[] }

    }

    componentDidUpdate(){
        console.log(slugify(this.props.form))
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}`+
            `&language=en-US&page=1&query=${slugify(this.props.form)}&include_adult=false`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                this.setState({ series: data.results.slice(0, 3)})
            })
            
    }
    
    render() {
        return (
            <div>   
                <br/>
                <SeriesList list = {this.state.series}/>
            </div>
        )
    };
    
}

export default Series;