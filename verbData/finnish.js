const finnishVerbs = [
  {
    "infinitive": "olla",
    "translation": "to be",
    "present": {
      "singular": {
        "first": "olen",
        "second": "olet",
        "third": "on"
      },
      "plural": {
        "first": "olemme",
        "second": "olette",
        "third": "ovat"
      }
    },
    "past": {
      "singular": {
        "first": "olin",
        "second": "olit",
        "third": "oli"
      },
      "plural": {
        "first": "olimme",
        "second": "olitte",
        "third": "olivat"
      }
    }
  },
  {
    "infinitive": "puhua",
    "translation": "to speak",
    "present": {
      "singular": {
        "first": "puhun",
        "second": "puhut",
        "third": "puhuu"
      },
      "plural": {
        "first": "puhumme",
        "second": "puhutte",
        "third": "puhuvat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "maalata",
    "translation": "to paint",
    "present": {
      "singular": {
        "first": "maalaan",
        "second": "maalaat",
        "third": "maalaa"
      },
      "plural": {
        "first": "maalaamme",
        "second": "maalaatte",
        "third": "maalaavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "kirjoittaa",
    "translation": "to write",
    "present": {
      "singular": {
        "first": "kirjoitan",
        "second": "kirjoitat",
        "third": "kirjoittaa"
      },
      "plural": {
        "first": "kirjoitamme",
        "second": "kirjoitatte",
        "third": "kirjoittavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "laulaa",
    "translation": "to sing",
    "present": {
      "singular": {
        "first": "laulan",
        "second": "laulat",
        "third": "laulaa"
      },
      "plural": {
        "first": "laulamme",
        "second": "laulatte",
        "third": "laulavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "niiata",
    "translation": "to bow",
    "present": {
      "singular": {
        "first": "niiaan",
        "second": "niiaat",
        "third": "niiaa"
      },
      "plural": {
        "first": "niiaamme",
        "second": "niiaatte",
        "third": "niiaavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "hyllyä",
    "translation": "to shake, jiggle",
    "present": {
      "singular": {
        "first": "hyllyn",
        "second": "hyllyt",
        "third": "hyllyy"
      },
      "plural": {
        "first": "hyllymme",
        "second": "hyllytte",
        "third": "hyllyvät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "lukea",
    "translation": "to read",
    "present": {
      "singular": {
        "first": "luen",
        "second": "luet",
        "third": "lukee"
      },
      "plural": {
        "first": "luemme",
        "second": "luette",
        "third": "lukevat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "juoda",
    "translation": "to drink",
    "present": {
      "singular": {
        "first": "juon",
        "second": "juot",
        "third": "juo"
      },
      "plural": {
        "first": "juomme",
        "second": "juotte",
        "third": "juovat"
      }
    },
    "past": {
      "singular": {
        "first": "join",
        "second": "joit",
        "third": "joi"
      },
      "plural": {
        "first": "joimme",
        "second": "joitte",
        "third": "joivat"
      }
    }
  },
  {
    "infinitive": "tutkia",
    "translation": "to study, examine",
    "present": {
      "singular": {
        "first": "tutkin",
        "second": "tutkit",
        "third": "tutkii"
      },
      "plural": {
        "first": "tutkimme",
        "second": "tutkitte",
        "third": "tutkivat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "myydä",
    "translation": "to sell",
    "present": {
      "singular": {
        "first": "myyn",
        "second": "myyt",
        "third": "myy"
      },
      "plural": {
        "first": "myymme",
        "second": "myytte",
        "third": "myyvät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "haukkua",
    "translation": "to bark",
    "present": {
      "singular": {
        "first": "haukun",
        "second": "haukut",
        "third": "haukkuu"
      },
      "plural": {
        "first": "haukumme",
        "second": "haukutte",
        "third": "haukkuvat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "ampua",
    "translation": "to shoot",
    "present": {
      "singular": {
        "first": "ammun",
        "second": "ammut",
        "third": "ammuu"
      },
      "plural": {
        "first": "ammumme",
        "second": "ammutte",
        "third": "ampuvat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "suudella",
    "translation": "to kiss",
    "present": {
      "singular": {
        "first": "suutelen",
        "second": "suutelet",
        "third": "suutelee"
      },
      "plural": {
        "first": "suutelemme",
        "second": "suutelette",
        "third": "suutelevat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "ottaa",
    "translation": "to take",
    "present": {
      "singular": {
        "first": "otan",
        "second": "otat",
        "third": "ottaa"
      },
      "plural": {
        "first": "otamme",
        "second": "otatte",
        "third": "ottavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "mitata",
    "translation": "to measure",
    "present": {
      "singular": {
        "first": "mittaan",
        "second": "mittaat",
        "third": "mittaa"
      },
      "plural": {
        "first": "mittaamme",
        "second": "mittaatte",
        "third": "mittaavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "syödä",
    "translation": "to eat",
    "present": {
      "singular": {
        "first": "syön",
        "second": "syöt",
        "third": "syö"
      },
      "plural": {
        "first": "syömme",
        "second": "syötte",
        "third": "syövät"
      }
    },
    "past": {
      "singular": {
        "first": "söin",
        "second": "söit",
        "third": "söi"
      },
      "plural": {
        "first": "söimme",
        "second": "söitte",
        "third": "söivät"
      }
    }
  },
  {
    "infinitive": "purra",
    "translation": "to bite",
    "present": {
      "singular": {
        "first": "puren",
        "second": "puret",
        "third": "puree"
      },
      "plural": {
        "first": "puremme",
        "second": "purette",
        "third": "purevat"
      }
    },
    "past": {
      "singular": {
        "first": "purin",
        "second": "purit",
        "third": "puri"
      },
      "plural": {
        "first": "purimme",
        "second": "puritte",
        "third": "purivat"
      }
    }
  },
  {
    "infinitive": "imeä",
    "translation": "to suck, absorb",
    "present": {
      "singular": {
        "first": "imen",
        "second": "imet",
        "third": "imee"
      },
      "plural": {
        "first": "imemme",
        "second": "imette",
        "third": "imevät"
      }
    },
    "past": {
      "singular": {
        "first": "imin",
        "second": "imit",
        "third": "imi"
      },
      "plural": {
        "first": "imimme",
        "second": "imitte",
        "third": "imivät"
      }
    }
  },
  {
    "infinitive": "sylkeä",
    "translation": "to spit",
    "present": {
      "singular": {
        "first": "syljen",
        "second": "syljet",
        "third": "sylkee"
      },
      "plural": {
        "first": "syljemme",
        "second": "syljette",
        "third": "sylkevät"
      }
    },
    "past": {
      "singular": {
        "first": "syljin",
        "second": "syljit",
        "third": "sylki"
      },
      "plural": {
        "first": "syljimme",
        "second": "syljitte",
        "third": "sylkivät"
      }
    }
  },
  {
    "infinitive": "oksentaa",
    "translation": "to vomit",
    "present": {
      "singular": {
        "first": "oksennan",
        "second": "oksennat",
        "third": "oksentaa"
      },
      "plural": {
        "first": "oksennamme",
        "second": "oksennatte",
        "third": "oksentavat"
      }
    },
    "past": {
      "singular": {
        "first": "oksensin",
        "second": "oksensit",
        "third": "oksensi"
      },
      "plural": {
        "first": "oksensimme",
        "second": "oksensitte",
        "third": "oksensivat"
      }
    }
  },
  {
    "infinitive": "puhaltaa",
    "translation": "to blow",
    "present": {
      "singular": {
        "first": "puhallan",
        "second": "puhallat",
        "third": "puhaltaa"
      },
      "plural": {
        "first": "puhallamme",
        "second": "puhallatte",
        "third": "puhaltavat"
      }
    },
    "past": {
      "singular": {
        "first": "puhalsin",
        "second": "puhalsit",
        "third": "puhalsi"
      },
      "plural": {
        "first": "puhalsimme",
        "second": "puhalsitte",
        "third": "puhalsivat"
      }
    }
  },
  {
    "infinitive": "hengittää",
    "translation": "to breathe",
    "present": {
      "singular": {
        "first": "hengitän",
        "second": "hengität",
        "third": "hengittää"
      },
      "plural": {
        "first": "hengitämme",
        "second": "hengitätte",
        "third": "hengittävät"
      }
    },
    "past": {
      "singular": {
        "first": "hengitin",
        "second": "hengitit",
        "third": "hengitti"
      },
      "plural": {
        "first": "hengitimme",
        "second": "hengititte",
        "third": "hengittivät"
      }
    }
  },
  {
    "infinitive": "nauraa",
    "translation": "to laugh",
    "present": {
      "singular": {
        "first": "nauran",
        "second": "naurat",
        "third": "nauraa"
      },
      "plural": {
        "first": "nauramme",
        "second": "nauratte",
        "third": "nauravat"
      }
    },
    "past": {
      "singular": {
        "first": "nauroin",
        "second": "nauroit",
        "third": "nauroi"
      },
      "plural": {
        "first": "nauroimme",
        "second": "nauroitte",
        "third": "nauroivat"
      }
    }
  },
  {
    "infinitive": "nähdä",
    "translation": "to see",
    "present": {
      "singular": {
        "first": "näen",
        "second": "näet",
        "third": "näkee"
      },
      "plural": {
        "first": "näemme",
        "second": "näette",
        "third": "näkevät"
      }
    },
    "past": {
      "singular": {
        "first": "näin",
        "second": "näit",
        "third": "näki"
      },
      "plural": {
        "first": "näimme",
        "second": "näitte",
        "third": "näkivät"
      }
    }
  },
  {
    "infinitive": "kuulla",
    "translation": "to hear",
    "present": {
      "singular": {
        "first": "kuulen",
        "second": "kuulet",
        "third": "kuulee"
      },
      "plural": {
        "first": "kuulemme",
        "second": "kuulette",
        "third": "kuulevat"
      }
    },
    "past": {
      "singular": {
        "first": "kuulin",
        "second": "kuulit",
        "third": "kuuli"
      },
      "plural": {
        "first": "kuulimme",
        "second": "kuulitte",
        "third": "kuulivat"
      }
    }
  },
  {
    "infinitive": "tietää",
    "translation": "to know",
    "present": {
      "singular": {
        "first": "tiedän",
        "second": "tiedät",
        "third": "tietää"
      },
      "plural": {
        "first": "tiedämme",
        "second": "tiedätte",
        "third": "tietävät"
      }
    },
    "past": {
      "singular": {
        "first": "tiesin",
        "second": "tiesit",
        "third": "tiesi"
      },
      "plural": {
        "first": "tiesimme",
        "second": "tiesitte",
        "third": "tiesivät"
      }
    }
  },
  {
    "infinitive": "ajatella",
    "translation": "to think",
    "present": {
      "singular": {
        "first": "ajattelen",
        "second": "ajattelet",
        "third": "ajattelee"
      },
      "plural": {
        "first": "ajattelemme",
        "second": "ajattelette",
        "third": "ajattelevat"
      }
    },
    "past": {
      "singular": {
        "first": "ajattelin",
        "second": "ajattelit",
        "third": "ajatteli"
      },
      "plural": {
        "first": "ajattelimme",
        "second": "ajattelitte",
        "third": "ajattelivat"
      }
    }
  },
  {
    "infinitive": "haistaa",
    "translation": "to smell",
    "present": {
      "singular": {
        "first": "haistan",
        "second": "haistat",
        "third": "haistaa"
      },
      "plural": {
        "first": "haistamme",
        "second": "haistatte",
        "third": "haistavat"
      }
    },
    "past": {
      "singular": {
        "first": "haistoin",
        "second": "haistoit",
        "third": "haistoi"
      },
      "plural": {
        "first": "haistoimme",
        "second": "haistoitte",
        "third": "haistoivat"
      }
    }
  },
  {
    "infinitive": "pelätä",
    "translation": "to fear",
    "present": {
      "singular": {
        "first": "pelkään",
        "second": "pelkäät",
        "third": "pelkää"
      },
      "plural": {
        "first": "pelkäämme",
        "second": "pelkäätte",
        "third": "pelkäävät"
      }
    },
    "past": {
      "singular": {
        "first": "pelkäsin",
        "second": "pelkäsit",
        "third": "pelkäsi"
      },
      "plural": {
        "first": "pelkäsimme",
        "second": "pelkäsitte",
        "third": "pelkäsivät"
      }
    }
  },
  {
    "infinitive": "nukkua",
    "translation": "to sleep",
    "present": {
      "singular": {
        "first": "nukun",
        "second": "nukut",
        "third": "nukuu"
      },
      "plural": {
        "first": "nukumme",
        "second": "nukutte",
        "third": "nukkuvat"
      }
    },
    "past": {
      "singular": {
        "first": "nukuin",
        "second": "nukuit",
        "third": "nukkui"
      },
      "plural": {
        "first": "nukuimme",
        "second": "nukuitte",
        "third": "nukkuivat"
      }
    }
  },
  {
    "infinitive": "elää",
    "translation": "to live",
    "present": {
      "singular": {
        "first": "elän",
        "second": "elät",
        "third": "elää"
      },
      "plural": {
        "first": "elämme",
        "second": "elätte",
        "third": "elävät"
      }
    },
    "past": {
      "singular": {
        "first": "elin",
        "second": "elit",
        "third": "eli"
      },
      "plural": {
        "first": "elimme",
        "second": "elitte",
        "third": "elivät"
      }
    }
  },
  {
    "infinitive": "kuolla",
    "translation": "to die",
    "present": {
      "singular": {
        "first": "kuolen",
        "second": "kuolet",
        "third": "kuolee"
      },
      "plural": {
        "first": "kuolemme",
        "second": "kuolette",
        "third": "kuolevat"
      }
    },
    "past": {
      "singular": {
        "first": "kuolin",
        "second": "kuolit",
        "third": "kuoli"
      },
      "plural": {
        "first": "kuolimme",
        "second": "kuolitte",
        "third": "kuolivat"
      }
    }
  },
  {
    "infinitive": "tappaa",
    "translation": "to kill",
    "present": {
      "singular": {
        "first": "tapan",
        "second": "tapat",
        "third": "tappaa"
      },
      "plural": {
        "first": "tapamme",
        "second": "tapatte",
        "third": "tappavat"
      }
    },
    "past": {
      "singular": {
        "first": "tapoin",
        "second": "tapoit",
        "third": "tappoi"
      },
      "plural": {
        "first": "tapoimme",
        "second": "tapoitte",
        "third": "tappoivat"
      }
    }
  },
  {
    "infinitive": "metsästää",
    "translation": "to hunt",
    "present": {
      "singular": {
        "first": "metsästän",
        "second": "metsästät",
        "third": "metsästää"
      },
      "plural": {
        "first": "metsästämme",
        "second": "metsästätte",
        "third": "metsästävät"
      }
    },
    "past": {
      "singular": {
        "first": "metsästin",
        "second": "metsästit",
        "third": "metsästi"
      },
      "plural": {
        "first": "metsästimme",
        "second": "metsästitte",
        "third": "metsästivät"
      }
    }
  },
  {
    "infinitive": "lyödä",
    "translation": "to hit, strike",
    "present": {
      "singular": {
        "first": "lyön",
        "second": "lyöt",
        "third": "lyö"
      },
      "plural": {
        "first": "lyömme",
        "second": "lyötte",
        "third": "lyövät"
      }
    },
    "past": {
      "singular": {
        "first": "löin",
        "second": "löit",
        "third": "löi"
      },
      "plural": {
        "first": "löimme",
        "second": "löitte",
        "third": "löivät"
      }
    }
  },
  {
    "infinitive": "leikata",
    "translation": "to cut",
    "present": {
      "singular": {
        "first": "leikkaan",
        "second": "leikkaat",
        "third": "leikkaa"
      },
      "plural": {
        "first": "leikkaamme",
        "second": "leikkaatte",
        "third": "leikkaavat"
      }
    },
    "past": {
      "singular": {
        "first": "leikkasin",
        "second": "leikkasit",
        "third": "leikkasi"
      },
      "plural": {
        "first": "leikkasimme",
        "second": "leikkasitte",
        "third": "leikkasivat"
      }
    }
  },
  {
    "infinitive": "halkaista",
    "translation": "to split",
    "present": {
      "singular": {
        "first": "halkaisen",
        "second": "halkaiset",
        "third": "halkaisee"
      },
      "plural": {
        "first": "halkaisemme",
        "second": "halkaisette",
        "third": "halkaisevat"
      }
    },
    "past": {
      "singular": {
        "first": "halkaisin",
        "second": "halkaisit",
        "third": "halkaisi"
      },
      "plural": {
        "first": "halkaisimme",
        "second": "halkaisitte",
        "third": "halkaisivat"
      }
    }
  },
  {
    "infinitive": "pistää",
    "translation": "to poke, thrust",
    "present": {
      "singular": {
        "first": "pistän",
        "second": "pistät",
        "third": "pistää"
      },
      "plural": {
        "first": "pistämme",
        "second": "pistätte",
        "third": "pistävät"
      }
    },
    "past": {
      "singular": {
        "first": "pistin",
        "second": "pistit",
        "third": "pisti"
      },
      "plural": {
        "first": "pistimme",
        "second": "pistitte",
        "third": "pistivät"
      }
    }
  },
  {
    "infinitive": "raapia",
    "translation": "to scratch",
    "present": {
      "singular": {
        "first": "raavin",
        "second": "raavit",
        "third": "raapii"
      },
      "plural": {
        "first": "raavimme",
        "second": "raavitte",
        "third": "raapivat"
      }
    },
    "past": {
      "singular": {
        "first": "raavin",
        "second": "raavit",
        "third": "raapii"
      },
      "plural": {
        "first": "raavimme",
        "second": "raavitte",
        "third": "raapivat"
      }
    }
  },
  {
    "infinitive": "kaivaa",
    "translation": "to dig",
    "present": {
      "singular": {
        "first": "kaivan",
        "second": "kaivat",
        "third": "kaivaa"
      },
      "plural": {
        "first": "kaivamme",
        "second": "kaivatte",
        "third": "kaivavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "uida",
    "translation": "to swim",
    "present": {
      "singular": {
        "first": "uin",
        "second": "uit",
        "third": "ui"
      },
      "plural": {
        "first": "uimme",
        "second": "uitte",
        "third": "uivat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "lentää",
    "translation": "to fly",
    "present": {
      "singular": {
        "first": "lennän",
        "second": "lennät",
        "third": "lentää"
      },
      "plural": {
        "first": "lennämme",
        "second": "lennätte",
        "third": "lentävät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "kävellä",
    "translation": "to walk",
    "present": {
      "singular": {
        "first": "kävelen",
        "second": "kävelet",
        "third": "kävelee"
      },
      "plural": {
        "first": "kävelemme",
        "second": "kävelette",
        "third": "kävelevät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "tulla",
    "translation": "to come",
    "present": {
      "singular": {
        "first": "tulen",
        "second": "tulet",
        "third": "tulee"
      },
      "plural": {
        "first": "tulemme",
        "second": "tulette",
        "third": "tulevat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "maata",
    "translation": "to lie down",
    "present": {
      "singular": {
        "first": "makaan",
        "second": "makaat",
        "third": "makaa"
      },
      "plural": {
        "first": "makaamme",
        "second": "makaatte",
        "third": "makaavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "istua",
    "translation": "to sit",
    "present": {
      "singular": {
        "first": "istun",
        "second": "istut",
        "third": "istuu"
      },
      "plural": {
        "first": "istumme",
        "second": "istutte",
        "third": "istuvat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "kääntyä",
    "translation": "to turn, bend",
    "present": {
      "singular": {
        "first": "käännyn",
        "second": "käännyt",
        "third": "kääntyy"
      },
      "plural": {
        "first": "käännymme",
        "second": "käännytte",
        "third": "kääntyvät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "pudota",
    "translation": "to drop, fall down",
    "present": {
      "singular": {
        "first": "putoan",
        "second": "putoat",
        "third": "putoaa"
      },
      "plural": {
        "first": "putoamme",
        "second": "putoatte",
        "third": "putoavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "antaa",
    "translation": "to give",
    "present": {
      "singular": {
        "first": "annan",
        "second": "annat",
        "third": "antaa"
      },
      "plural": {
        "first": "annamme",
        "second": "annatte",
        "third": "antavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "pitää",
    "translation": "to hold, keep",
    "present": {
      "singular": {
        "first": "pidän",
        "second": "pidät",
        "third": "pitää"
      },
      "plural": {
        "first": "pidämme",
        "second": "pidätte",
        "third": "pitävät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "puristaa",
    "translation": "to press, squeeze",
    "present": {
      "singular": {
        "first": "puristan",
        "second": "puristat",
        "third": "puristaa"
      },
      "plural": {
        "first": "puristamme",
        "second": "puristatte",
        "third": "puristavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "hieroa",
    "translation": "to massage, rub",
    "present": {
      "singular": {
        "first": "hieron",
        "second": "hierot",
        "third": "hieroo"
      },
      "plural": {
        "first": "hieromme",
        "second": "hierotte",
        "third": "hierovat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "pyyhkiä",
    "translation": "to wipe, clean",
    "present": {
      "singular": {
        "first": "pyyhin",
        "second": "pyyhit",
        "third": "pyyhkii"
      },
      "plural": {
        "first": "pyyhimme",
        "second": "pyyhitte",
        "third": "pyyhkivat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "vetää",
    "translation": "to pull, drag",
    "present": {
      "singular": {
        "first": "vedän",
        "second": "vedät",
        "third": "vetää"
      },
      "plural": {
        "first": "vedämme",
        "second": "vedätte",
        "third": "vetävät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "työntää",
    "translation": "to push",
    "present": {
      "singular": {
        "first": "työnnän",
        "second": "työnnät",
        "third": "työntää"
      },
      "plural": {
        "first": "työnnämme",
        "second": "työnnatte",
        "third": "työntävät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "heittää",
    "translation": "to throw",
    "present": {
      "singular": {
        "first": "heitän",
        "second": "heität",
        "third": "heittää"
      },
      "plural": {
        "first": "heitämme",
        "second": "heitätte",
        "third": "heittävät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "sitoa",
    "translation": "to bind, fasten, tie",
    "present": {
      "singular": {
        "first": "sidon",
        "second": "sidot",
        "third": "sitoo"
      },
      "plural": {
        "first": "sidomme",
        "second": "sidotte",
        "third": "sitovat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "ommella",
    "translation": "to sew",
    "present": {
      "singular": {
        "first": "ompelen",
        "second": "ompelet",
        "third": "ompelee"
      },
      "plural": {
        "first": "ompelemme",
        "second": "ompelette",
        "third": "ompelevat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "laskea",
    "translation": "to lower, move down/count, calculate",
    "present": {
      "singular": {
        "first": "lasken",
        "second": "lasket",
        "third": "laskee"
      },
      "plural": {
        "first": "laskemme",
        "second": "laskette",
        "third": "laskevat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "sanoa",
    "translation": "to say",
    "present": {
      "singular": {
        "first": "sanon",
        "second": "sanot",
        "third": "sanoo"
      },
      "plural": {
        "first": "sanomme",
        "second": "sanotte",
        "third": "sanovat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "leikkiä",
    "translation": "to play",
    "present": {
      "singular": {
        "first": "leikin",
        "second": "leikit",
        "third": "leikkii"
      },
      "plural": {
        "first": "leikimme",
        "second": "leikitte",
        "third": "leikkivät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "kellua",
    "translation": "to float",
    "present": {
      "singular": {
        "first": "kellun",
        "second": "kellut",
        "third": "kelluu"
      },
      "plural": {
        "first": "kellumme",
        "second": "kellutte",
        "third": "kelluvat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "virrata",
    "translation": "to flow",
    "present": {
      "singular": {
        "first": "virtaan",
        "second": "virtaat",
        "third": "virtaa"
      },
      "plural": {
        "first": "virtaamme",
        "second": "virtaatte",
        "third": "virtaavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "jäätyä",
    "translation": "to freeze",
    "present": {
      "singular": {
        "first": "jäädyn",
        "second": "jäädyt",
        "third": "jäätyy"
      },
      "plural": {
        "first": "jäädymme",
        "second": "jäädytte",
        "third": "jäätyvät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "paisua",
    "translation": "to swell",
    "present": {
      "singular": {
        "first": "paisun",
        "second": "paisut",
        "third": "paisuu"
      },
      "plural": {
        "first": "paisumme",
        "second": "paisutte",
        "third": "paisuvat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "odottaa",
    "translation": "to wait",
    "present": {
      "singular": {
        "first": "odotan",
        "second": "odotat",
        "third": "odottaa"
      },
      "plural": {
        "first": "odotamme",
        "second": "odotatte",
        "third": "odottavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "muistaa",
    "translation": "to remember",
    "present": {
      "singular": {
        "first": "muistan",
        "second": "muistat",
        "third": "muistaa"
      },
      "plural": {
        "first": "muistamme",
        "second": "muistatte",
        "third": "muistavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "opiskella",
    "translation": "to study",
    "present": {
      "singular": {
        "first": "opiskelen",
        "second": "opiskelet",
        "third": "opiskelee"
      },
      "plural": {
        "first": "opiskelemme",
        "second": "opiskelette",
        "third": "opiskelevat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "oppia",
    "translation": "to learn",
    "present": {
      "singular": {
        "first": "opin",
        "second": "opit",
        "third": "oppii"
      },
      "plural": {
        "first": "opimme",
        "second": "opitte",
        "third": "oppivat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "vastata",
    "translation": "to answer, respond",
    "present": {
      "singular": {
        "first": "vastaan",
        "second": "vastaat",
        "third": "vastaa"
      },
      "plural": {
        "first": "vastaamme",
        "second": "vastaavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "herätä",
    "translation": "to wake up",
    "present": {
      "singular": {
        "first": "herään",
        "second": "heräät",
        "third": "herää"
      },
      "plural": {
        "first": "heräämme",
        "second": "heräätte",
        "third": "heräävät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "saada",
    "translation": "to get, receive",
    "present": {
      "singular": {
        "first": "saan",
        "second": "saat",
        "third": "saa"
      },
      "plural": {
        "first": "saamme",
        "second": "saatte",
        "third": "saavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "tehdä",
    "translation": "to do, make",
    "present": {
      "singular": {
        "first": "teen",
        "second": "teet",
        "third": "tekee"
      },
      "plural": {
        "first": "teemme",
        "second": "teette",
        "third": "tekevät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "kertoa",
    "translation": "to tell",
    "present": {
      "singular": {
        "first": "kerron",
        "second": "kerrot",
        "third": "kertoo"
      },
      "plural": {
        "first": "kerromme",
        "second": "kerrotte",
        "third": "kertovat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "haluta",
    "translation": "to want, desire",
    "present": {
      "singular": {
        "first": "haluan",
        "second": "haluat",
        "third": "haluaa"
      },
      "plural": {
        "first": "haluamme",
        "second": "haluatte",
        "third": "haluavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "alkaa",
    "translation": "to begin, start",
    "present": {
      "singular": {
        "first": "alan",
        "second": "alat",
        "third": "alkaa"
      },
      "plural": {
        "first": "alamme",
        "second": "alatte",
        "third": "alkavat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "käydä",
    "translation": "to go (to), visit",
    "present": {
      "singular": {
        "first": "käyn",
        "second": "käyt",
        "third": "käy"
      },
      "plural": {
        "first": "käymme",
        "second": "käytte",
        "third": "käyvät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "toimia",
    "translation": "to act, work, function",
    "present": {
      "singular": {
        "first": "toimin",
        "second": "toimit",
        "third": "toimii"
      },
      "plural": {
        "first": "toimimme",
        "second": "toimitte",
        "third": "toimivat"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "mennä",
    "translation": "to go",
    "present": {
      "singular": {
        "first": "menen",
        "second": "menet",
        "third": "menee"
      },
      "plural": {
        "first": "melemme",
        "second": "melette",
        "third": "menevät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "käyttää",
    "translation": "to use",
    "present": {
      "singular": {
        "first": "käytän",
        "second": "käytät",
        "third": "käyttää"
      },
      "plural": {
        "first": "käytämme",
        "second": "käytätte",
        "third": "käyttävät"
      }
    },
    "past": {
      "singular": {},
      "plural": {}
    }
  },
  {
    "infinitive": "nuolla",
    "translation": "to lick",
    "present": {
      "singular": {
        "first": "nuolen",
        "second": "nuolet",
        "third": "nuolee"
      },
      "plural": {
        "first": "nuolemme",
        "second": "nuolette",
        "third": "nuolevat"
      }
    },
    "past": {
      "singular": {
        "first": "nuolin",
        "second": "nuolit",
        "third": "nuoli"
      },
      "plural": {
        "first": "nuolimme",
        "second": "nuolitte",
        "third": "nuolivat"
      }
    }
  },
  {
    "infinitive": "siivota",
    "translation": "to clean, tidy up",
    "present": {
      "singular": {
        "first": "siivoan",
        "second": "siivoat",
        "third": "siivoaa"
      },
      "plural": {
        "first": "siivoamme",
        "second": "siivoatte",
        "third": "siivoavat"
      }
    },
    "past": {
      "singular": {
        "first": "siivosin",
        "second": "siivosit",
        "third": "siivosi"
      },
      "plural": {
        "first": "siiosimme",
        "second": "siivositte",
        "third": "siivosivat"
      }
    }
  },
  {
    "infinitive": "kompastua",
    "translation": "to stumble",
    "present": {
      "singular": {
        "first": "kompastun",
        "second": "kompastut",
        "third": "komastuu"
      },
      "plural": {
        "first": "kompastumme",
        "second": "kompastutte",
        "third": "kompastuvat"
      }
    },
    "past": {
      "singular": {
        "first": "kompastuin",
        "second": "kompastuit",
        "third": "kompastui"
      },
      "plural": {
        "first": "kompastuimme",
        "second": "kompastuitte",
        "third": "kompastuivat"
      }
    }
  },
];