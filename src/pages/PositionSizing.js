import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import PositionRules from '../components/PositionRules';
import PositionPlan from '../components/PositionPlan';
import PositionExecute from '../components/PositionExecute';
import utils from '../utils/utils';
import { useSessionStorage } from "../customHooks/useStorage"

const LOCAL_STORAGE_INIT_VALUE = "storage.";

export default function PositionSizing() {
    //*Variables and Hooks for important data
    const [isLong, setIsLongChange,] = useSessionStorage(`${LOCAL_STORAGE_INIT_VALUE}isLong`, "")
    const [MaxSize, setMaxSize, removeMaxSize] = useSessionStorage(`${LOCAL_STORAGE_INIT_VALUE}MaxSize`, "")
    const [MaxLoss, setMaxLoss, removeMaxLoss] = useSessionStorage(`${LOCAL_STORAGE_INIT_VALUE}MaxLoss`, "")
    const [Reward, setReward, removeReward] = useSessionStorage(`${LOCAL_STORAGE_INIT_VALUE}Reward`, "")
    const [Risk, setRisk, removeRisk] = useSessionStorage(`${LOCAL_STORAGE_INIT_VALUE}Risk`, "")


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

    const [executed, setExecuted, removeExecuted] = useSessionStorage(`${LOCAL_STORAGE_INIT_VALUE}executed`, [])

    const [AveragePriceExe, setAveragePriceExe] = useState(0);
    const [SharesTotalsExe, setSharesTotalsExe] = useState(0);
    const [SizeAvgPriceExe, setSizeAvgPriceExe] = useState(0);
    const [PlannedRewardExe, setPlannedRewardExe] = useState(0);
    const [PlannedLossExe, setPlannedLossExe] = useState(0);
    const [PlannedRewardPercExe, setPlannedRewardPercExe] = useState(0);
    const [PlannedLossPercExe, setPlannedLossPercExe] = useState(0);
    const [RelationRiskRewardExe, setRelationRiskRewardExe] = useState(0);

    //Object construction
    const PositionTypeObj = { islong: isLong, setState: setIsLongChange, setExecuted, Executed: executed, removeAllData };
    const MaxSizeObj = { setState: setMaxSize, value: MaxSize };
    const MaxLossObj = { setState: setMaxLoss, value: MaxLoss };
    const RewardObj = { setState: setReward, value: Reward };
    const RiskObj = { setState: setRisk, value: Risk };

    const averagePriceObj = { val: AveragePrice };
    const sharesTotalsObj = { val: SharesTotals };
    const sizeAvgPriceObj = { val: SizeAvgPrice };
    const plannedRewardObj = { dolars: PlannedReward, percent: PlannedRewardPerc };
    const plannedLossObj = { dolars: PlannedLoss, percent: PlannedLossPerc };
    const relationRiskRewardObj = { val: RelationRiskReward };

    const referenceEntryObj = { setState: setReferenceEntry };
    const referenceSharesObj = { setState: setReferenceShares, referenceShare: ReferenceShares };

    const averagePriceExeObj = { val: AveragePriceExe };
    const sharesTotalsExeObj = { val: SharesTotalsExe };
    const sizeAvgPriceExeObj = { val: SizeAvgPriceExe };
    const plannedRewardExeObj = { dolars: PlannedRewardExe, percent: PlannedRewardPercExe };
    const plannedLossExeObj = { dolars: PlannedLossExe, percent: PlannedLossPercExe };
    const relationRiskRewardExeObj = { val: RelationRiskRewardExe };

    const [invalidValueReferenceEntry, setInvalidValueReferenceEntry] = useState(false)
    useEffect(() => {
        if (isNaN(Risk) || isNaN(Reward) || isNaN(ReferenceEntry)) return setInvalidValueReferenceEntry(false);
        if (ReferenceEntry === 0) return setInvalidValueReferenceEntry(false);
        if (Risk <= ReferenceEntry && ReferenceEntry <= Reward) return setInvalidValueReferenceEntry(false);
        if (Risk >= ReferenceEntry && ReferenceEntry >= Reward) return setInvalidValueReferenceEntry(false);
        setInvalidValueReferenceEntry(true)

    }, [Risk, Reward, ReferenceEntry])

    const [isLongMultiplier, setisLongMultiplier] = useState(1);
    useEffect(() => {
        setisLongMultiplier(isLong ? 1 : -1)
    }, [isLong]);

    //* Unify objects by component
    const positionRulesObj = { MaxSizeObj, PositionTypeObj, MaxLossObj, RewardObj, RiskObj }
    const positionPlanObj = { planningResults: { averagePriceObj, sharesTotalsObj, sizeAvgPriceObj, plannedRewardObj, plannedLossObj, relationRiskRewardObj }, planningInput: { referenceEntryObj, referenceSharesObj, invalidValueReferenceEntry, isLong } };
    const positionExecuteObj = {
        isLong, executed, setExecuted, ChangeStoredExecute, DeleteStoredExecute,
        planningResults: { averagePriceObj: averagePriceExeObj, sharesTotalsObj: sharesTotalsExeObj, sizeAvgPriceObj: sizeAvgPriceExeObj, plannedRewardObj: plannedRewardExeObj, plannedLossObj: plannedLossExeObj, relationRiskRewardObj: relationRiskRewardExeObj }
    };


    useEffect(() => {    //* Use Effect for formula Calculations
        calcAveragePriceExe();
    }, [executed]);

    useEffect(() => {
        if (!utils.validateInputs("calcRewardExe", [
            { value: AveragePriceExe, name: "AveragePriceExe", type: 1 },
            { value: Reward, name: "Reward", type: 1 },
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
        ])) return
        calcRewardExe();
    }, [AveragePriceExe, Reward, SharesTotalsExe]);

    useEffect(() => {
        if (!utils.validateInputs("calcLossExe", [
            { value: AveragePriceExe, name: "AveragePriceExe", type: 1 },
            { value: Risk, name: "Risk", type: 1 },
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
        ])) return
        calcLossExe();
    }, [AveragePriceExe, Risk, SharesTotalsExe]);

    useEffect(() => {
        // Init validations
        if (!utils.validateInputs("calcRiskRewardMedia", [
            { value: AveragePriceExe, name: "AveragePriceExe", type: 1 },
            { value: Risk, name: "Risk", type: 1 },
            { value: Reward, name: "Reward", type: 1 },
        ])) return
        if (AveragePriceExe === 0) return setRelationRiskRewardExe(0);
        if ((AveragePriceExe - Risk) === 0) return setRelationRiskRewardExe(0);
        // End of validations
        calcRiskRewardMedia();
    }, [AveragePriceExe, Risk, Reward]);

    useEffect(() => {
        // Init validations
        if (!utils.validateInputs("calcReferenceShare", [
            { value: MaxLoss, name: "MaxLoss", type: 1 },
            { value: PlannedLossExe, name: "PlannedLossExe", type: 1 },
            { value: ReferenceEntry, name: "ReferenceEntry", type: 1 },
            { value: Risk, name: "Risk", type: 1 },
        ])) return
        if (ReferenceEntry === 0) return setReferenceShares((0))
        // End of validations
        calcReferenceShare();
    }, [RelationRiskReward, SizeAvgPriceExe, ReferenceEntry, plannedLossExeObj, Reward]);

    useEffect(() => {
        // Init validations
        if (!utils.validateInputs("calcAveragePrice", [
            { value: ReferenceShares, name: "ReferenceShares", type: 1 },
            { value: AveragePriceExe, name: "AveragePriceExe", type: 1 },
            { value: SizeAvgPriceExe, name: "SizeAvgPriceExe", type: 1 },
        ])) return
        // End of validations
        calcAveragePrice();
    }, [ReferenceShares, AveragePriceExe, SizeAvgPriceExe]);

    useEffect(() => {
        // Init validations
        if (!utils.validateInputs("calcTotalShares", [
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
            { value: ReferenceShares, name: "ReferenceShares", type: 1 },
        ])) return
        // End of validations
        calcTotalShares();
    }, [ReferenceShares, SharesTotalsExe]);

    useEffect(() => {
        // Init validations
        if (!utils.validateInputs("calcSizeAveragePrice", [
            { value: SharesTotals, name: "SharesTotals", type: 1 },
            { value: AveragePrice, name: "AveragePrice", type: 1 },
        ])) return
        // End of validations
        calcSizeAveragePrice();
    }, [AveragePrice, SharesTotals]);

    useEffect(() => {
        // Init validations
        if (!utils.validateInputs("calcPlannedLoss", [
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
            { value: AveragePrice, name: "AveragePrice", type: 1 },
            { value: Risk, name: "Risk", type: 1 },
        ])) return
        // End of validations
        calcPlannedLoss();
    }, [AveragePrice, Risk, SharesTotals]);

    useEffect(() => {
        // Init validations
        if (!utils.validateInputs("calcPlannedReward", [
            { value: SharesTotalsExe, name: "SharesTotalsExe", type: 1 },
            { value: AveragePrice, name: "AveragePrice", type: 1 },
            { value: Reward, name: "Reward", type: 1 },
        ])) return
        // End of validations
        calcPlannedReward();
    }, [AveragePrice, Reward, SharesTotals]);

    useEffect(() => {
        // Init validations
        if (!utils.validateInputs("calcPlannedRiskReward", [
            { value: AveragePrice, name: "AveragePrice", type: 1 },
            { value: Reward, name: "Reward", type: 1 },
            { value: Risk, name: "Risk", type: 1 },
        ])) return setRelationRiskReward(0)
        // End of validations
        calcPlannedRiskReward();
    }, [AveragePrice, Reward, Risk]);

    function removeAllData() {//*We will skip only max size and max lose
        setSizeAvgPriceExe(0)
        setPlannedLossPercExe(0)
        setReferenceShares(0)
        setReferenceEntry(0)
        setRisk(0)
        setReward(0)
        setAveragePrice(0)
    }

    function ChangeStoredExecute(id, shares, price) {   //* Function that allow us to edit a execution value
        const newExecuted = [...executed];
        const Execute = newExecuted.find(x => x.id === id);
        if (!utils.validationsCheckAllExecutions(executed, id, shares, isLong)) return false
        Execute.shares = shares;
        Execute.price = price;
        setExecuted(newExecuted);
        calcAveragePriceExe();
        return true
    }

    function DeleteStoredExecute(id) {

        if (!utils.validationsCheckAllExecutions(executed, id, 0, isLong)) return false
        const Executed_temp = utils.arrayWithDiferentIdThan(executed, id)
        setExecuted(Executed_temp);
        calcAveragePriceExe();
        return true
    }

    // CALCULATION AREA
    function calcAveragePriceExe() {
        const newExecuted = [...executed];
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
        setSizeAvgPriceExe((tempTotalSh * tempAvg) * isLongMultiplier);
    }

    function calcRewardExe() {
        if (SharesTotalsExe === 0) {    //*if there are no shares, there are no rewards or loss, no matter the calculations
            setPlannedRewardExe(0);
            setPlannedRewardPercExe(0);
            return
        }
        setPlannedRewardPercExe(((Reward - AveragePriceExe) * 100 * isLongMultiplier / AveragePriceExe))
        setPlannedRewardExe(((Reward - AveragePriceExe) * SharesTotalsExe))
    }

    function calcLossExe() {
        if (SharesTotalsExe === 0) {    //*if there are no shares, there are no rewards or loss, no matter the calculations
            setPlannedLossPercExe(0);
            setPlannedLossExe(0);
            return
        }
        setPlannedLossPercExe(((AveragePriceExe - Risk) * 100 * isLongMultiplier / AveragePriceExe))
        setPlannedLossExe(((AveragePriceExe - Risk) * SharesTotalsExe));
    }

    function calcRiskRewardMedia() {
        if (SharesTotalsExe === 0) return setRelationRiskRewardExe(0);    //*if there are no shares, there are no rewards or loss, no matter the calculations
        setRelationRiskRewardExe(((Reward - AveragePriceExe) / (AveragePriceExe - Risk)))
    }

    function calcReferenceShare() {
        let maxLossWay = (MaxLoss - PlannedLossExe) / (ReferenceEntry - Risk);
        let maxSizeWay = (parseFloat(MaxSize) - parseFloat(SizeAvgPriceExe)) / (ReferenceEntry);
        let compare = ((ReferenceEntry * (MaxLoss - PlannedLossExe)) / ((ReferenceEntry - Risk) * isLongMultiplier)) + parseFloat(SizeAvgPriceExe);
        let finalValue = 0;
        if (compare > MaxSize) {
            if (isNaN(maxSizeWay)) return;
            finalValue = (maxSizeWay);
        } else {
            if (isNaN(maxLossWay)) return;
            finalValue = (maxLossWay);
        }
        setReferenceShares(Math.trunc(utils.abs(finalValue)))
    }

    function calcAveragePrice() {
        const avgPriceTemp = (SizeAvgPriceExe + (ReferenceEntry * ReferenceShares)) / (ReferenceShares + (SharesTotalsExe * isLongMultiplier))
        setAveragePrice(avgPriceTemp)
    }

    function calcTotalShares() {
        const totalSharesTemp = SharesTotalsExe + (ReferenceShares * isLongMultiplier);
        setSharesTotals(totalSharesTemp)
    }

    function calcSizeAveragePrice() {
        const size = (SharesTotals * AveragePrice) * isLongMultiplier;
        setSizeAvgPrice(size)
    }

    function calcPlannedLoss() {
        const plannedLossObjTemp = (AveragePrice - Risk) * SharesTotals
        setPlannedLoss(plannedLossObjTemp);
        const plannedLossObjPercTemp = (AveragePrice - Risk) / AveragePrice * isLongMultiplier
        setPlannedLossPerc(plannedLossObjPercTemp * 100);
    }

    function calcPlannedReward() {
        const plannedRewardObjTemp = (Reward - AveragePrice) * SharesTotals
        setPlannedReward(plannedRewardObjTemp);
        const plannedRewardObjPercTemp = (Reward - AveragePrice) / AveragePrice * isLongMultiplier
        setPlannedRewardPerc(plannedRewardObjPercTemp * 100);
    }

    function calcPlannedRiskReward() {
        if (AveragePrice === 0) return setRelationRiskReward(0);
        const plannedRiskRewardTemp = (Reward - AveragePrice) / (AveragePrice - Risk)
        setRelationRiskReward(plannedRiskRewardTemp);

    }
    // CALCULATION AREA
    //todo useContext -> we need to use context to pass round values, to only have round in the visual components

    return (
        <Container className={isLong ? "long" : "short"}>
            <Row>
                <Col md="3">
                    <PositionRules positionRulesObj={positionRulesObj} />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <PositionPlan positionPlanObj={positionPlanObj} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PositionExecute positionExecuteObj={positionExecuteObj} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
