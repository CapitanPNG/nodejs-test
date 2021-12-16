USE `test`;

CREATE TABLE `utente`
(
    `id`            BIGINT UNSIGNED        NOT NULL AUTO_INCREMENT,

    `email`         VARCHAR(255) BINARY    NOT NULL,
    `password`      VARCHAR(60)  BINARY    NOT NULL,

    `is_admin`      BOOLEAN                NOT NULL,

    `creation_time` DATETIME               NOT NULL DEFAULT NOW(),
    `update_time`   DATETIME               NULL ON UPDATE NOW(),

    PRIMARY KEY (`id`),

    UNIQUE KEY (`email`)
)
ENGINE = InnoDB
;

CREATE TABLE `anagrafica_utente`
(
    `utente`               BIGINT UNSIGNED NOT NULL,

    `nome`                 VARCHAR(255)    NOT NULL,
    `cognome`              VARCHAR(255)    NOT NULL,

    `data_nascita`         DATE            NOT NULL,
    `luogo_nascita`        VARCHAR(255)    NOT NULL,

    `sesso`                VARCHAR(1)      NOT NULL,

    `data_emissione_carta` DATE            NOT NULL,
    `data_scadenza_carta`  DATE            NOT NULL,
    `codice_carta`         VARCHAR(255)    NOT NULL,

    PRIMARY KEY (`utente`),

    FOREIGN KEY (`utente`)
    REFERENCES `utente` (`id`)

    ON UPDATE CASCADE
    ON DELETE CASCADE
)
ENGINE = InnoDB
;