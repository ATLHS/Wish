import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./Dashboard.scss";
// import Fade from "react-reveal/Slide";
import FormGroup from "../../components/FormGroup/FormGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import giftJsonSchemaForm from "../../schemas/giftJsonSchemaForm";
import giftService from "../../services/gift";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [memberName, setMemberName] = useState("");
  const [gifts, setGifts] = useState([]);
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("selectedTab") || "wishlists"
  );
  const [formSchema, setFormSchema] = useState([]);
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    setGifts(list);
    const schemaProperties = Object.keys(giftJsonSchemaForm.fields).map(
      (key) => giftJsonSchemaForm.fields[key]
    );
    setFormSchema(schemaProperties);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  const list = [
    {
      name: "Gift title",
      description: "Gift description",
      available: true,
    },
    {
      name: "Gift title",
      description: "Gift description",
      available: true,
    },
    {
      name: "Gift title",
      description: "Gift description",
      available: false,
    },
    {
      name: "Gift title",
      description: "Gift description",
      available: true,
    },
    {
      name: "Gift title",
      description: "Gift description",
      available: false,
    },
    {
      name: "Gift title",
      description: "Gift description",
      available: true,
    },
    {
      name: "Gift title",
      description: "Gift description",
      available: true,
    },
  ];

  const onSubmit = (data) => {
    // if (email && username && !confirmCode) {
    // setIsLoading(true);
    console.log(data, "data");
    // giftService
    //   .createGift(data)
    //   .then((res) => res)
    //   .then((r) => {
    //     // setIsLoading(false);
    //     console.log(r);
    //     // setMessage(r.message);
    //   })
    //   .catch((err) => {
    //     // setIsLoading(false);
    //     // setMessage(err.message);
    //     console.log(err);
    //   });
    // }
  };

  const getAvailableGift = () => {
    setGifts(list.filter((item) => item.available === false));
  };

  const getUnavailableGift = () => {
    setGifts(list.filter((item) => item.available === true));
  };

  const getAllGift = () => {
    setGifts(list);
  };
  const members = [
    "Tornade",
    "Danseuse",
    "Furie",
    "Fringant",
    "Comète",
    "Cupidon",
    "Tonnerre",
    "Eclair",
    "Rudolph",
  ];
  const goToProductView = () => {};
  return (
    <Container
      className="dashboard"
      style={{ height: window.outerHeight }}
      fluid
    >
      <Row className="dashboard__container">
        <Col className="dashboard__container__section" md={6}>
          <Tabs
            defaultActiveKey={selectedTab}
            className="dashboard__container__section__tabs mb-5"
            onSelect={(tabKey) => setSelectedTab(tabKey)}
          >
            <Tab
              eventKey="wishlists"
              title="Listes"
              className="dashboard__container__section__tabs__tab"
            >
              <Row className="dashboard__container__section__tabs__tab__avatars">
                {members.map((member, i) => (
                  <Col
                    key={i}
                    className="dashboard__container__section__tabs__tab__avatars__avatar"
                    onClick={() => setMemberName(member)}
                  >
                    <Image
                      className="dashboard__container__section__tabs__tab__avatars__avatar__image"
                      src="https://i.pinimg.com/564x/e6/d5/ba/e6d5ba09df41fa0cdc582d5f99c89012.jpg"
                      rounded
                    />
                    <small className="text-muted text-center">{member}</small>
                  </Col>
                ))}
              </Row>
              <Row className="dashboard__container__section__tabs__tab__list">
                <Col className="dashboard__container__section__tabs__tab__list__container">
                  <Row className="dashboard__container__section__tabs__tab__list__container__filter-section">
                    <Col className="dashboard__container__section__tabs__tab__list__container__filter-section__title">
                      <p className="dashboard__container__section__tabs__tab__list__container__filter-section__title__description">
                        Liste de :{" "}
                        <strong>{memberName ? memberName : members[0]}</strong>
                      </p>
                    </Col>
                    <Col className="dashboard__container__section__tabs__tab__list__container__filter-section__filter">
                      <Dropdown
                        className="dashboard__container__section__tabs__tab__list__container__filter-section__filter__dropdown"
                        style={{ textAlign: "right" }}
                      >
                        <Dropdown.Toggle
                          className="dashboard__container__section__tabs__tab__list__container__filter-section__filter__dropdown__toggle"
                          variant="dark"
                        >
                          Trié les cadeaux par
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                          className="dashboard__container__section__tabs__tab__list__container__filter-section__filter__dropdown__menu"
                          variant="dark"
                        >
                          <Dropdown.Item
                            className="dashboard__container__section__tabs__tab__list__container__filter-section__filter__dropdown__menu__item"
                            onClick={() => getAvailableGift()}
                          >
                            Disponibilté
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dashboard__container__section__tabs__tab__list__container__filter-section__filter__dropdown__menu__item"
                            onClick={() => getUnavailableGift()}
                          >
                            Indisponibilité
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="dashboard__container__section__tabs__tab__list__container__filter-section__filter__dropdown__menu__item"
                            onClick={() => getAllGift()}
                          >
                            Défault
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                  {/* <Fade
                    className="dashboard__container__section__tabs__tab__list__container__group"
                    bottom
                    cascade
                    spy={gifts}
                  > */}
                  <div className="dashboard__container__section__tabs__tab__list__container__group__items">
                    {gifts.map((gift, i) => (
                      <ListGroup.Item
                        key={i}
                        className="dashboard__container__section__tabs__tab__list__container__group__items__item"
                        action
                        variant={gift.available ? "success" : "dark"}
                        onClick={() => goToProductView()}
                      >
                        Gift title
                      </ListGroup.Item>
                    ))}
                  </div>
                  {/* </Fade> */}
                </Col>
              </Row>
            </Tab>
            <Tab
              eventKey="wishlist"
              title="Ma liste"
              className="dashboard__container__section__tabs__tab"
            >
              <Row className="dashboard__container__section__tabs__tab__wishlist">
                <Col className="dashboard__container__section__tabs__tab__wishlist__container">
                  <p className="dashboard__container__section__tabs__tab__wishlist__container__title">
                    Ajouter un nouveau cadeau
                  </p>
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                    // className="signup-form"
                  >
                    {/* <h2 className="signup-form-title">
                      {!user.username
                        ? "Inscription"
                        : !user.isConfirmCode
                        ? "Tu y es presque."
                        : "Un dernier petit pas !"}
                    </h2> */}
                    {/* <div className="signup-form-headline">
                      {!isLoading ? (
                        !message ? (
                          "Bienvenue sur Wish"
                        ) : (
                          message
                        )
                      ) : (
                        <>
                          <Form.Group className="signup-form-spinner">
                            <Spinner
                              animation="border"
                              variant="primary"
                              size="lg"
                            />
                          </Form.Group>
                        </>
                      )}
                    </div> */}
                    <FormGroup schema={formSchema} control={control} />
                    <Form.Group className="signup-form-group">
                      <Button
                        className="signup-form-button"
                        variant="dark"
                        size="lg"
                        type="submit"
                      >
                        Ajouter à ma liste
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
                <Col></Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
