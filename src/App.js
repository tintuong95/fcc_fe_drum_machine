import { useEffect, useRef, useState } from "react";
import Radio from "./components/Radio";
import jQuery from "jquery";
import AudioOne from "./audio.json";

import AudioTwo from "./audio2.json";

const listKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

function App() {
  const [bank, setBank] = useState(1);
  const [power, setPower] = useState(1);
  const [display, setDisplay] = useState("");
  const valRef = useRef(1);

  const onSounding = (evt) => {
    const { key } = evt;
    const audio = jQuery(`#${key.toUpperCase()}`);
    audio.trigger("play");
    setDisplay(audio.data("name"));
  };

  const onSoundingClick = (evt) => {
    evt.target.children[0].play();
   setDisplay(evt.target.children[0].dataset.name);
  };

  const renderListAudio = (status) => {
    let list = [];
    if (status == 1) {
      list = AudioOne;
    } else {
      list = AudioTwo;
    }

    return Object.entries(list).map((item, key) => {
      return (
        <button
          id={item[0]}
          className="drum-pad"
          onClick={onSoundingClick}
          onKeyDown={onSounding}
        >
          {listKeys[key]}

          <audio
            data-name={item[0]}
            className="clip"
            src={item[1]}
            id={listKeys[key]}
          ></audio>
        </button>
      );
    });
  };

  const onChange = (e) => {
   if(power==1){
     const audio = jQuery("audio");
     audio.prop("volume", e.target.value);
   }
  };

  useEffect(() => {
    const audio = jQuery("audio");
    if (power == 2) {
      audio.prop("volume", 0);
    } else {
      audio.prop("volume", valRef.current.value);
    }
  }, [power]);

  return (
    <div className="App">
      <div className="container">
        <div className="flex-logo">
          <strong>
            {" "}
            FCC<i class="inner-logo fa fa-free-code-camp"></i>
          </strong>
        </div>
        <main>
          <div id="drum-machine" className=" grid">
            {renderListAudio(bank)}
          </div>
          <div className="flex ">
            <div>
              <strong>Power</strong>
              <div>
                <Radio value={power} setValue={setPower} name={"power"} />
              </div>
            </div>
            <div id="display">
              <strong>{display}</strong>
            </div>
            <div>
              <input
                type="range"
                id="points"
                name="points"
                min="0"
                max="1"
                ref={valRef}
                step={0.1}
                onChange={onChange}
              ></input>
            </div>
            <div>
              <strong> Bank</strong>
              <div>
                <Radio value={bank} setValue={setBank} name={"bank"} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
