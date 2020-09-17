import React from "react";

import Feilds from "../feilds/feilds.js";

import styles from "./styles.module.css";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { closeModal, pokemon, isLoading } = this.props;

    return (
      <div className={styles.Modal}>
        <div className={styles.Container}>
          <div className={styles.title}>
            <span>{pokemon.name}</span>
            <button onClick={() => closeModal()}>Close</button>
          </div>
          <div className={styles.Content}>
            <div className={styles.sizes}>
              <div className={styles.field}>
                <div className={styles.smallTitle}>Abilities:</div>
                <div className={styles.fieldContainer}>
                  {pokemon.data.abilities.map((row, index) => (
                    <Feilds
                      key={index + row}
                      ability={row.ability.name}
                      index={index + 1}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.smallTitle}>Types:</div>
                <div className={styles.fieldContainer}>
                  {pokemon.data.types.map((row, index) => (
                    <Feilds
                      key={index + row}
                      ability={row.type.name}
                      index={index + 1}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.smallTitle}>Moves:</div>
              <div className={styles.fieldContainer}>
                {pokemon.data.moves.map((row, index) => (
                  <Feilds
                    key={index + row}
                    ability={row.move.name}
                    index={index + 1}
                  />
                ))}
              </div>
            </div>

            <div className={styles.sizes}>
              <div className={styles.field}>
                <div className={styles.fieldContainer}>
                  <Feilds label={"Weight"} ability={pokemon.data.weight} />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldContainer}>
                  <Feilds label={"Height"} ability={pokemon.data.height} />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldContainer}>
                  <Feilds
                    label={"Base Exp"}
                    ability={pokemon.data.base_experience}
                  />
                </div>
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.smallTitle}>Stats:</div>
              <div className={styles.fieldStats}>
                {pokemon.data.stats.map((row, index) => (
                  <Feilds
                    key={index + row}
                    label={row.stat.name}
                    ability={row.base_stat}
                    index={index + 1}
                    className={styles.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div className={styles.field}>
// <div className={styles.smallTitle}>Moves:</div>
// <div className={styles.fieldContainer}>
//   {pokemon.data.moves.map((row, index) => (
//     <Feilds
//       key={index + row}
//       ability={row.move.name}
//       index={index + 1}
//     />
//   ))}
// </div>
// </div>

// <div className={styles.field}>
// <div className={styles.smallTitle}>Weight:</div>
// <div className={styles.fieldContainer}>
//   <Feilds ability={pokemon.data.weight} />
// </div>
// </div>
