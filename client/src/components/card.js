import React, { useState } from 'react';

const Card = ({ pw }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    gameTitle: "",
    price: 0,
    isMainGame: true,
    // Add other properties as needed
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleGameAndPriceSubmit = async () => {
    try {
      await fetch("/add/games_and_price", {
        method: "POST",
        body: JSON.stringify({
          game: editedValues.gameTitle, price: editedValues.price, kook_id: pw.kook_id, is_main_game: editedValues.isMainGame
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
    } catch (err) {
      console.error('handleGameAndPriceSubmit error:', err);
    }
  }

  const handleSaveEdit = async () => {
    // Perform the action to save the edited values (e.g., make an API call)
    // After saving, close the edit mode
    await handleGameAndPriceSubmit();
    setIsEditing(false);
  };

  const renderGames = (games, title) => {

    return (
      games && games.length > 0 && (
        <div>
          <p>{title}:</p>
          <ul>
            {games.map((game_row, index) => (
              <li key={index}>{game_row.game}, {game_row.price}, {game_row.main_game ? "主营游戏" : "其他游戏"} </li>
            ))}
          </ul>
        </div>
      )
    );
  }

  return (
    <div className="card">
      <div className="container">
        <h4><b>名字: {pw.name}</b></h4>
        <p>编号: {pw.display_id}</p>
        <p>kook ID: {pw.kook_id}</p>
        <p>logo 类型: {pw.label}</p>
        <p>音色: {pw.timbre}</p>
        <p>个人特点: {pw.introduction}</p>
        <p>坐标: {pw.location}</p>
        <p>头像图片: {pw.picture_url}</p>
        <p>联系方式: {pw.contact_info}</p>
        {/* <p>主营游戏: {pw.timbre}</p>
           <p>其他游戏: {pw.timbre}</p> */}
        {renderGames(pw.games, "游戏")}
        {!isEditing ? (
          <button onClick={handleEditClick}>添加游戏</button>
        ) : (
          <div>
            <label>
              游戏名称:
              <input
                type="text"
                name="gameTitle"
                value={editedValues.gameTitle}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              价格:
              <input
                type="number"
                name="price"
                value={editedValues.price}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              是主营游戏请打勾:
              <input
                type="checkbox"
                name="isMainGame"
                checked={editedValues.isMainGame}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button onClick={handleSaveEdit}>提交</button>
            <button onClick={handleCancelEdit}>取消</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
