import React from "react";
import axios from "axios";
import AddButton from "./AddButton";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class HeroDetails extends React.Component {
  state = {
    singleHero: "",
  };

  getSingleHero = () => {
    axios
      .get(`https://reqres.in/api/users/${this.props.id}`)
      .then((response) => {
        console.log("singleHero", response.data.data);
        this.setState({ singleHero: response.data.data });
      })
      .catch((err) => console.log("error", err));
  };

  componentDidMount() {
    this.getSingleHero();
  }

  handleToogle = (id) => {
    // console.log("heroes");
    // console.log('id '+id);
    // console.log('this.props.heroes before');
    //console.log(this.props.heroes);
    let heroesCopy = this.props.heroes;
    var index = heroesCopy.indexOf(id);
    // console.log('index  ' + index);
    if (index > -1) {
      heroesCopy.splice(index, 1);
      //console.log('heroesCopy');
      // console.log(heroesCopy);
      // Vérifier les ...
      this.props.setHeroes([...heroesCopy]);
    } else {
      if (heroesCopy.length < 3) {
        this.props.setHeroes([...heroesCopy, id]);
      } else {
        // custom the basic alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, you can select 3 heroes only !",
          confirmButtonColor:"#fb826a",
        });
        //alert("Sorry, you can only chose 3 heroes !");
      }
      //
    }
  };

  render() {
    return (
      <div>
        <div className="page-description container">
          <h2 className="page-title">
            Find more about {this.state.singleHero.first_name}
          </h2>
          <p>
            Is {this.state.singleHero.first_name} the right match for your team
            ?
          </p>
        </div>
        <main className="main">
          <section className="page-container">
            <div className="card-container">
              <div className="card">
                <div className="card-figure-details">
                  <img src={this.state.singleHero.avatar} alt=""></img>
                </div>
                <br></br>
                <h3>
                  {this.state.singleHero.first_name}{" "}
                  {this.state.singleHero.last_name}
                </h3>

                <p>Contact : {this.state.singleHero.email}</p>
                <AddButton
                  id={this.state.singleHero.id}
                  onToogle={this.handleToogle}
                />
              </div>
            </div>
          </section>
          <Link to={`/`}>
            <em>Back to the team selection</em>
          </Link>
        </main>
      </div>
    );
  }
}

export default HeroDetails;
