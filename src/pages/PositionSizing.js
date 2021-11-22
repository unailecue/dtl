import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import PositionRules from '../components/PositionRules';
import PositionPlan from '../components/PositionPlan';
import PositionExecute from '../components/PositionExecute';
import { Trans } from 'react-i18next';
import utils from '../utils/utils';

const LOCAL_STORAGE_EXE = "storage.executedvalues";
const LOCAL_STORAGE_TYPE = "storage.type";
const LOCAL_STORAGE_MAX_SIZE = "storage.maxSize";
const LOCAL_STORAGE_MAX_LOSS = "storage.maxLoss";
const LOCAL_STORAGE_REWARD = "storage.reward";
const LOCAL_STORAGE_RISK = "storage.risk";


export default function PositionSizing() {



    //Variables and Hooks for important data
    const [isLong, setIsLongChange] = useState();
    const [MaxSize, setMaxSize] = useState();
    const [MaxLoss, setMaxLoss] = useState();
    const [Reward, setReward] = useState();
    const [Risk, setRisk] = useState();

    const [AveragePrice, setAveragePrice] = useState(0);
    const [SharesTotals, setSharesTotals] = useState(0);
    const [SizeAvgPrice, setSizeAvgPrice] = useState(0);
    const [PlannedReward, setPlannedReward] = useState(0);
    const [PlannedLoss, setPlannedLoss] = useState(0);
    const [PlannedRewardPerc, setPlannedRewardPerc] = useState(0);
    const [PlannedLossPerc, setPlannedLossPerc] = useState(0);
    const [RelationRiskReward, setRelationRiskReward] = useState(0);

    const [ReferenceEntry, setReferenceEntry] = useState(0);
    const [ReferenceShares, setReferenceShares] = useState(0);

    const [Executed, setExecuted] = useState([]);

    const [AveragePriceExe, setAveragePriceExe] = useState(0);
    const [SharesTotalsExe, setSharesTotalsExe] = useState(0);
    const [SizeAvgPriceExe, setSizeAvgPriceExe] = useState(0);
    const [PlannedRewardExe, setPlannedRewardExe] = useState(0);
    const [PlannedLossExe, setPlannedLossExe] = useState(0);
    const [PlannedRewardPercExe, setPlannedRewardPercExe] = useState(0);
    const [PlannedLossPercExe, setPlannedLossPercExe] = useState(0);
    const [RelationRiskRewardExe, setRelationRiskRewardExe] = useState(0);

    //Object construction
    const PositionTypeObj = { islong: isLong, setState: setIsLongChange, setExecuted: setExecuted, Executed: Executed };
    const MaxSizeObj = { name: <Trans>Max Size</Trans>, onlyDolarSymbol: true, setState: setMaxSize, value: MaxSize };
    const MaxLossOBJ = { name: <Trans>Max Loss</Trans>, onlyDolarSymbol: true, setState: setMaxLoss, value: MaxLoss };
    const RewardOBJ = { name: <Trans>Planned reward level</Trans>, onlyDolarSymbol: false, setState: setReward, value: Reward };
    const RiskOBJ = { name: <Trans>Planned risk level</Trans>, onlyDolarSymbol: false, setState: setRisk, value: Risk };

    const averagePrice = { name: <Trans>Average price</Trans>, onlyDolarSymbol: "$/sh", val: AveragePrice };
    const sharesTotals = { name: <Trans>Total shares</Trans>, onlyDolarSymbol: "Sh", val: SharesTotals };
    const sizeAvgPrice = { name: <Trans>Size</Trans>, onlyDolarSymbol: "$", val: SizeAvgPrice };
    const plannedReward = { name: <Trans>Planned Reward</Trans>, onlyDolarSymbol: "$", dolars: PlannedReward, percent: PlannedRewardPerc };
    const plannedLoss = { name: <Trans>Planned Loss</Trans>, onlyDolarSymbol: false, dolars: PlannedLoss, percent: PlannedLossPerc };
    const relationRiskReward = { name: <Trans>Risk Reward</Trans>, onlyDolarSymbol: ":1", val: RelationRiskReward };


    const referenceEntry = { name: <Trans>Reference Entry</Trans>, setState: setReferenceEntry };
    const referenceShares = { name: <Trans>Reference Shares</Trans>, setState: setReferenceShares, referenceShare: ReferenceShares };

    const averagePriceExe = { name: <Trans>Average price</Trans>, onlyDolarSymbol: "$/sh", val: AveragePriceExe };
    const sharesTotalsExe = { name: <Trans>Total shares</Trans>, onlyDolarSymbol: "Sh", val: SharesTotalsExe };
    const sizeAvgPriceExe = { name: <Trans>Size</Trans>, onlyDolarSymbol: "$", val: SizeAvgPriceExe };
    const plannedRewardExe = { name: <Trans>Planned Reward</Trans>, onlyDolarSymbol: "$", dolars: PlannedRewardExe, percent: PlannedRewardPercExe };
    const plannedLossExe = { name: <Trans>Planned Loss</Trans>, onlyDolarSymbol: false, dolars: PlannedLossExe, percent: PlannedLossPercExe };
    const relationRiskRewardExe = { name: <Trans>Risk Reward</Trans>, onlyDolarSymbol: ":1", val: RelationRiskRewardExe };

    //Unify objects by component
    const positionRules = { title: <Trans>Rules</Trans>, MaxSize: MaxSizeObj, PositionType: PositionTypeObj, MaxLoss: MaxLossOBJ, Reward: RewardOBJ, Risk: RiskOBJ }
    const positionPlan = { planningResults: { title: <Trans>Plan results</Trans>, averagePrice: averagePrice, sharesTotals: sharesTotals, sizeAvgPrice: sizeAvgPrice, plannedReward: plannedReward, plannedLoss: plannedLoss, relationRiskReward: relationRiskReward }, planningInput: { title: <Trans>Plan</Trans>, referenceEntry: referenceEntry, referenceShares: referenceShares } };
    const positionExecute = {
        isLong: isLong,
        addExecution: {
            title: <Trans>Add executions</Trans>, deleteAllText: <Trans>delete all</Trans>, sharesLabel: <Trans>Shares</Trans>, priceLabel: <Trans>Price</Trans>, addButtonText: <Trans>Add</Trans>, sellButtonText: <Trans>sellButtonText</Trans>, isLong: isLong

        }, executed: Executed, setExecuted: setExecuted, changeStoredExecute: ChangeStoredExecute, planningResults: { title: <Trans>Plan results executed</Trans>, averagePrice: averagePriceExe, sharesTotals: sharesTotalsExe, sizeAvgPrice: sizeAvgPriceExe, plannedReward: plannedRewardExe, plannedLoss: plannedLossExe, relationRiskReward: relationRiskRewardExe }
    };

    const vars = { isLong, setIsLongChange, MaxSize, setMaxSize, MaxLoss, setMaxLoss, Reward, setReward, Risk, setRisk, Executed, setExecuted }


    // Effect to get execution values from local storage
    useEffect(() => {
        //* Executed values
        const storedExecuted = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EXE))
        if (storedExecuted) setExecuted(storedExecuted);
        //* Execution type
        const storedType = localStorage.getItem(LOCAL_STORAGE_TYPE);
        let tempIsLong = true;
        if (storedType === "false") tempIsLong = false
        setIsLongChange(tempIsLong);
        //* Max size
        const maxSize = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MAX_SIZE))
        if (maxSize) setMaxSize(maxSize);
        //* Max loss
        const maxLoss = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MAX_LOSS))
        if (maxLoss) setMaxLoss(maxLoss);
        //* Reward
        const reward = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REWARD))
        if (reward) setReward(reward);
        //* Risk
        const risk = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RISK))
        if (risk) setRisk(risk);
    }, []);

    //* Effect to set execution values to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_EXE, JSON.stringify(Executed));
        calcAveragePriceExe();
    }, [Executed])

    //* Effect to set type to localStorage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_TYPE, isLong);
    }, [isLong])

    //* Effect to set maxSize values to local storage
    useEffect(() => {
        if (MaxSize) localStorage.setItem(LOCAL_STORAGE_MAX_SIZE, JSON.stringify(MaxSize));
    }, [MaxSize])

    //* Effect to set maxSize values to local storage
    useEffect(() => {
        if (MaxLoss) localStorage.setItem(LOCAL_STORAGE_MAX_LOSS, JSON.stringify(MaxLoss));
    }, [MaxLoss])

    //* Effect to set maxSize values to local storage
    useEffect(() => {
        if (Risk) localStorage.setItem(LOCAL_STORAGE_RISK, JSON.stringify(Risk));
    }, [Risk])

    //* Effect to set maxSize values to local storage
    useEffect(() => {
        if (Reward) localStorage.setItem(LOCAL_STORAGE_REWARD, JSON.stringify(Reward));
    }, [Reward])

    //* Use Effect for formula Calculations
    useEffect(() => {
        //todo check wich should be changed and wich not
        calcRewardExe();
        calcLossExe();
        calcRiskRewardMedia();
        calcReferenceShare();
        calcAveragePrice();
        calcPlannedLoss();
        calcTotalShares();
        calcSizeAveragePrice();
        calcPlannedReward();
        calcPlannedRiskReward();
    }, [averagePriceExe, Reward, sharesTotalsExe, Risk])


    //function that allow us to edit a execution value
    function ChangeStoredExecute(id, shares, price) {
        const newExecuted = [...Executed];
        const Execute = newExecuted.find(x => x.id === id);
        Execute.shares = shares;
        Execute.price = price;
        setExecuted(newExecuted);
        calcAveragePriceExe();
    }

    // CALCULATION AREA
    function calcAveragePriceExe() {
        const newExecuted = [...Executed];
        let tempAvg = 0;
        let tempTotalSh = 0;
        newExecuted.forEach(executed => {
            if (isLong) {
                if (parseFloat(executed.shares) > 0) (tempAvg = ((tempAvg * tempTotalSh) + (parseFloat(executed.shares) * parseFloat(executed.price))) / (tempTotalSh + parseFloat(executed.shares)))
            } else {
                if (parseFloat(executed.shares) < 0) (tempAvg = ((tempAvg * tempTotalSh) + (parseFloat(executed.shares) * parseFloat(executed.price))) / (tempTotalSh + parseFloat(executed.shares)))
            }
            tempTotalSh += parseFloat(executed.shares);
        })
        setAveragePriceExe(tempAvg);
        setSharesTotalsExe(tempTotalSh);
        setSizeAvgPriceExe((tempTotalSh * tempAvg));
    }

    function calcRewardExe() {
        if (!utils.validateInputs("calcRewardExe", [
            { value: AveragePriceExe, name: "AveragePriceExe", type: 1 },
            { value: Reward, name: "Reward", type: 1 },
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
        ])) return
        setPlannedRewardPercExe(((AveragePriceExe - Reward) * 100 / AveragePriceExe))
        setPlannedRewardExe(((Reward - AveragePriceExe) * SharesTotalsExe))
    }
    function calcLossExe() {

        if (!utils.validateInputs("calcLossExe", [
            { value: AveragePriceExe, name: "AveragePriceExe", type: 1 },
            { value: Risk, name: "Risk", type: 1 },
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
        ])) return
        setPlannedLossPercExe(((AveragePriceExe - Risk) * 100 / AveragePriceExe))
        setPlannedLossExe(((AveragePriceExe - Risk) * SharesTotalsExe));
    }
    function calcRiskRewardMedia() {
        //* Init validations
        if (!utils.validateInputs("calcRiskRewardMedia", [
            { value: AveragePriceExe, name: "AveragePriceExe", type: 1 },
            { value: Risk, name: "Risk", type: 1 },
            { value: Reward, name: "Reward", type: 1 },
        ])) return
        if ((AveragePriceExe - Risk) === 0) return;
        //* End of validations
        setRelationRiskRewardExe(((Reward - AveragePriceExe) / (AveragePriceExe - Risk)))

    }

    function calcReferenceShare() {
        if (isNaN(MaxLoss) && isNaN(PlannedLossExe) && isNaN(ReferenceEntry) && isNaN(Risk)) return console.log("no aplica")
        let firstWay = (MaxLoss - PlannedLossExe) / (ReferenceEntry - Risk);
        let secondWay = (parseFloat(MaxSize) - parseFloat(SizeAvgPriceExe)) / (ReferenceEntry);
        let compare = ((ReferenceEntry * (MaxLoss - PlannedLossExe)) / ((ReferenceEntry - Risk))) + parseFloat(SizeAvgPriceExe);
        if (compare > -MaxSize) {
            console.log("%c ReferenceShare: Basado en la primera formula", "color: #bada55")
            if (isNaN(secondWay)) return;
            setReferenceShares(secondWay);
        } else {
            console.log("%c ReferenceShare: Basado en la segunda formula", "color: blue")
            if (isNaN(firstWay)) return;
            setReferenceShares(firstWay);
        }
    }

    function calcAveragePrice() {
        //* Init validations
        if (!utils.validateInputs("calcAveragePrice", [
            { value: AveragePriceExe, name: "AveragePriceExe", type: 1 },
            { value: SizeAvgPriceExe, name: "SizeAvgPriceExe", type: 1 },
            { value: ReferenceEntry, name: "ReferenceEntry", type: 1 },
        ])) return
        //* End of validations
        const avgPriceTemp = ((AveragePriceExe * SizeAvgPriceExe) + (ReferenceEntry * ReferenceShares)) / (ReferenceShares - SharesTotalsExe)
        setAveragePrice(avgPriceTemp)
    }

    function calcTotalShares() {
        //* Init validations
        if (!utils.validateInputs("calcTotalShares", [
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
            { value: ReferenceShares, name: "ReferenceShares", type: 1 },
        ])) return
        //* End of validations
        const totalSharesTemp = (SharesTotalsExe + ReferenceShares);
        setSharesTotals(totalSharesTemp)
    }
    function calcSizeAveragePrice() {
        //* Init validations
        if (!utils.validateInputs("calcSizeAveragePrice", [
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
            { value: AveragePrice, name: "AveragePrice", type: 1 },
        ])) return
        //* End of validations
        const size = (SharesTotals * AveragePrice);
        setSizeAvgPrice(size)
    }

    function calcPlannedLoss() {
        //* Init validations
        if (!utils.validateInputs("calcPlannedLoss", [
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
            { value: AveragePrice, name: "AveragePrice", type: 1 },
            { value: Risk, name: "Risk", type: 1 },
        ])) return
        //* End of validations
        const plannedLossTemp = (AveragePrice - Risk) / SharesTotalsExe
        setPlannedLoss(plannedLossTemp);
        const plannedLossPercTemp = (AveragePrice - Risk) / AveragePrice
        setPlannedLossPerc(plannedLossPercTemp * 100);
    }

    function calcPlannedReward() {
        //* Init validations
        if (!utils.validateInputs("calcPlannedReward", [
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
            { value: AveragePrice, name: "AveragePrice", type: 1 },
            { value: Reward, name: "Reward", type: 1 },
        ])) return
        //* End of validations
        const plannedRewardTemp = (Reward - AveragePrice) / SharesTotalsExe
        setPlannedReward(plannedRewardTemp);
        const plannedRewardPercTemp = (Reward - AveragePrice) / AveragePrice
        setPlannedRewardPerc(plannedRewardPercTemp * 100);
    }
    function calcPlannedRiskReward() {
        //* Init validations
        if (!utils.validateInputs("calcPlannedRiskReward", [
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
            { value: AveragePrice, name: "AveragePrice", type: 1 },
            { value: Reward, name: "Reward", type: 1 },
            { value: Risk, name: "Risk", type: 1 },
        ])) return
        //* End of validations
        const plannedRiskRewardTemp = (Reward - AveragePrice) / (AveragePrice - Risk)
        setRelationRiskReward(plannedRiskRewardTemp);

    }
    // CALCULATION AREA

    //todo stringInComponent -> remove all string passing throgh components and have them in each component whit the TRANS tag
    //todo useContext -> we need to use context to pass round values, to only have round in the visual components
    //todo useEffect -> filter better the useeffect by each calculation and having it controlled

    return (
        <Container>
            <Row>
                <Col md="3">
                    <PositionRules positionRules={positionRules} />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <PositionPlan positionPlan={positionPlan} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PositionExecute positionExecute={positionExecute} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
