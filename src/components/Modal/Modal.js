import React from "react";

import Feilds from "../feilds/feilds.js";

import styles from "./styles.module.css";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { closeModal, pokemon } = this.props;

    return (
      <div
        className={styles.Modal}
        onClick={() => {
          closeModal();
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${styles.Container} ${styles.grounds}`}
        >
          <div className={styles.Image}>
            <img className={styles.image} src={pokemon.image} />
            <div className={styles.pokemon}>
              <div className={styles.title}>{pokemon.name}</div>
              <div className={`${styles.flex} ${styles.Types}`}>
                <div>Types:</div>
                {pokemon.data.types.map((row, index) => (
                  <Feilds
                    key={index + row}
                    ability={row.type.name}
                    index={index + 1}
                  />
                ))}
              </div>
              <div className={styles.flex}>
                <div className={styles.info}>
                  <span>Height:</span>
                  <div>{pokemon.data.height}</div>
                </div>
                <div className={styles.info}>
                  <span>Weight:</span>
                  <div>{pokemon.data.weight}</div>
                </div>
                <div className={styles.info}>
                  <span>Base_Experience:</span>
                  <div>{pokemon.data.base_experience}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.Moves} ${styles.Transparent}`}>
            <div className={styles.title}>Moves:</div>
            <div className={styles.field}>
              <div className={styles.fieldMoves}>
                {pokemon.data.moves.map((row, index) => (
                  <Feilds key={index + row} ability={row.move.name} />
                ))}
              </div>
            </div>
          </div>
          <div className={`${styles.Stats} ${styles.Transparent}`}>
            <div className={styles.field}>
              <div className={styles.title}>Stats:</div>
              <div className={styles.statsContainer}>
                {pokemon.data.stats.map((row, index) => (
                  <div className={styles.fieldStats}>
                    <Feilds
                      key={index + row}
                      label={row.stat.name}
                      ability={row.base_stat}
                      index={index + 1}
                      className={styles.label}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div className={styles.title}>
// <span>{pokemon.name}</span>
// <button onClick={() => closeModal()}>x</button>
// </div>
// <div className={styles.Content}>
// <div className={styles.sizes}>
//   <div className={styles.field}>
//     <div className={styles.smallTitle}>Abilities:</div>
//     <div className={styles.fieldContainer}>
//       {pokemon.data.abilities.map((row, index) => (
//         <Feilds
//           key={index + row}
//           ability={row.ability.name}
//           index={index + 1}
//         />
//       ))}
//     </div>
//   </div>
//   <div className={styles.field}>
//     <div className={styles.smallTitle}>Types:</div>
//     <div className={styles.fieldContainer}>
// {pokemon.data.types.map((row, index) => (
//   <Feilds
//     key={index + row}
//     ability={row.type.name}
//     index={index + 1}
//   />
// ))}
//     </div>
//   </div>
// </div>

// <div className={styles.field}>
//   <div className={styles.smallTitle}>Moves:</div>
//   <div className={styles.fieldContainer}>
//     {pokemon.data.moves.map((row, index) => (
//       <Feilds
//         key={index + row}
//         ability={row.move.name}
//         index={index + 1}
//       />
//     ))}
//   </div>
// </div>

// <div className={styles.sizes}>
//   <div className={styles.field}>
//     <div className={styles.fieldContainer}>
//       <Feilds label={"Weight"} ability={pokemon.data.weight} />
//     </div>
//   </div>
// <div className={styles.field}>
//   <div className={styles.fieldContainer}>
//     <Feilds label={"Height"} ability={pokemon.data.height} />
//   </div>
// </div>
// <div className={styles.field}>
//   <div className={styles.fieldContainer}>
//     <Feilds
//       label={"Base Exp"}
//       ability={pokemon.data.base_experience}
//     />
//   </div>
// </div>
// </div>
// <div className={styles.field}>
//   <div className={styles.smallTitle}>Stats:</div>
//   <div className={styles.fieldStats}>
//     {pokemon.data.stats.map((row, index) => (
//       <Feilds
//         key={index + row}
//         label={row.stat.name}
//         ability={row.base_stat}
//         index={index + 1}
//         className={styles.label}
//       />
//     ))}
//   </div>
// </div>
// </div>
