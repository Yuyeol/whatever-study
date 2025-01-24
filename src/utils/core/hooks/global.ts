interface IGlobal {
  states: any[];
  index: number;
}

const hookManager = () => {
  const global: IGlobal = {
    states: [],
    index: 0,
  };

  return {
    getStateAt: (idx: number) => global.states[idx],
    setStateAt: (idx: number, value: any) => {
      global.states[idx] = value;
    },

    getIndex: () => global.index,
    incrementIndex: () => {
      global.index++;
    },
    resetIndex: () => {
      global.index = 0;
    },
  };
};

export const global = hookManager();
