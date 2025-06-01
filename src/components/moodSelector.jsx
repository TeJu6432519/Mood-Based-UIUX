// src/components/MoodSelector.jsx
const MoodSelector = ({ mood, setMood }) => {
  return (
    <div style={{ marginTop: 20 }}>
      <label htmlFor="mood">Select your mood manually:</label>
      <select
        id="mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={{ padding: 10, fontSize: 16, marginLeft: 10 }}
      >
        <option value="neutral">Neutral</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="angry">Angry</option>
        <option value="disgusted">Disgusted</option>
        <option value="fearful">Fearful</option>
        <option value="surprised">Surprised</option>
        <option value="contempt">Contempt</option>
      </select>
    </div>
  );
};

export default MoodSelector;
