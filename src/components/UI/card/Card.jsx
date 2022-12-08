import classes from "./Card.module.scss";

const Card = ({path, icon, title }) => {
    return (
        <section className={classes.Card} onClick={()=>{console.log('path', path)}}>

            <span>{icon}</span>
            <p className={classes.title}>{title}</p>
        </section>
    );
};

export default Card;
