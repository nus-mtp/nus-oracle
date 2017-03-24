export const AY1617 = { name: "CS Degree Requirements", requiredMC: 160,
                       subreq:[0,
                        {name: 'University Level Requirements', requiredMC: 20},
                        {name: 'Program Requirements', requiredMC: 108,
                         subreq:[0,
                          {name: "Computer Science Foundation", requiredMC: 36,
                           subreq:[0,
                             {name: "CS1010"},
                             {name: "CS1020"},
                             {name: "CS2010"},
                             {name: "CS1231"},
                             {name: "CS2100"},
                             {name: "CS2103T"},
                             {name: "CS2105"},
                             {name: "CS2106"},
                             {name: "CS3230"}
                           ]
                          },
                          {name: "Computer Science Breadth and Depth", requiredMC: 44,
                           subreq:[0,
                             {name:"Focus Area", requiredMC: 24,
                              subreq:[1,
                                {name:"3 modules in Area Primary", requiredMC: 12,
                                  subreq:[1,
                                    {name: "Algorithms and Theory",
                                     subreq: [3,
                                        {name: "CS3230"},{name: "CS3236"},{name: "CS4231"},{name: "CS4232"},{name: "CS4234"}
                                      ]},
                                    {name: "Computer Graphics and Games",
                                     subreq: [3,
                                       {name: "CS3241"},{name: "CS3242"},{name: "CS3247"},{name: "CS4247"},{name: "CS4350"}
                                     ]},
                                   {name: "Computer Security",
                                    subreq: [3,
                                      {name: "CS2107"},{name: "CS3235"},{name: "CS4236"},{name: "CS4238"}
                                    ]},
                                  ]
                                },
                                {name:"12 MCs of level-4000 or above", requiredMC: 12, isStrictMC: true,
                                  // subreq: list of all 4k 5k 6k CS mods
                                }
                             ]},
                             {name:"Computer Systems Team Project"},
                             {name:"Industrial Experience Requirement"}
                           ]},
                          {name: "IT Professionalism", requiredMC: 12,
                            subreq:[0,
                              {name: "IS1103FC"},
                              {name: "CS2101"}
                            ]
                          },
                          {name: "Mathematics and Sciences", requiredMC: 16, isStrictMC:true,
                           subreq:[0,
                             {name: "MA1301"},
                             {name: "MA1521"},
                             {name: "MA1101R"},
                             {name: "EITHER", requiredMC: 8,
                              subreq:[1,
                                {name: "ST2334 Probability and Statistics and a Science Module",
                                 subreq:[0,{name:"ST2334"}, {name:"Science Mod"}]}, // subreq: [2, list of all science mods]}]},
                                {name: "ST2131 Probability and ST2132 Mathematical Statistics",
                                 subreq:[0,{name:"ST2131"}, {name:"ST2132"}, {name: "Science Mod"}]},  // subreq: [1, list of all science mods]}]},
                               ]
                             },
                             {name: "PC1221"},
                             {name: "Science Module", // subreq: [list of all science modules]
                             }
                            ]
                          }
                        ]},
                        {name: 'Unrestricted Electives', requiredMC: 32}
                      ]};
