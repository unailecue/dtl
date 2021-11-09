import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, ToggleButton, Form, Row, Col, Table, Container } from 'react-bootstrap';
import PositionRules from '../components/PositionRules';
import PositionPlan from '../components/PositionPlan';
import PositionExecute from '../components/PositionExecute';
import { Trans } from 'react-i18next';
const LOCAL_STORAGE = "storage.executedvalues";


export default function PositionSizing() {



    //Variables and Hooks for important data
    const [isLong, setIsLongChange] = useState(true);
    const [MaxSize, setMaxSize] = useState();
    const [MaxLoss, setMaxLoss] = useState();
    const [Reward, setReward] = useState();
    const [Risk, setRisk] = useState();

    const [AvergaPrice, setAvergaPrice] = useState();
    const [SharesTotals, setSharesTotals] = useState();
    const [SizeAvgPrice, setSizeAvgPrice] = useState();
    const [PlannedReward, setPlannedReward] = useState();
    const [PlannedLoss, setPlannedLoss] = useState();
    const [PlannedRewardPerc, setPlannedRewardPerc] = useState();
    const [PlannedLossPerc, setPlannedLossPerc] = useState();
    const [RelationRiskReward, setRelationRiskReward] = useState();

    const [ReferenceEntry, setReferenceEntry] = useState();
    const [ReferenceShares, setReferenceShares] = useState();

    const [Executed, setExecuted] = useState([]);

    const [AvergaPriceExe, setAvergaPriceExe] = useState(0);
    const [SharesTotalsExe, setSharesTotalsExe] = useState(0);
    const [SizeAvgPriceExe, setSizeAvgPriceExe] = useState();
    const [PlannedRewardExe, setPlannedRewardExe] = useState();
    const [PlannedLossExe, setPlannedLossExe] = useState();
    const [PlannedRewardPercExe, setPlannedRewardPercExe] = useState();
    const [PlannedLossPercExe, setPlannedLossPercExe] = useState();
    const [RelationRiskRewardExe, setRelationRiskRewardExe] = useState();

    //Object construction
    const PositionTypeObj = { name: <Trans>Position Type</Trans>, islong: isLong, setState: setIsLongChange, nameShortValue: <Trans>Short</Trans>, nameLongValue: <Trans>Long</Trans> };
    const MaxSizeObj = { name: <Trans>Max Size</Trans>, onlyDolarSymbol: true, setState: setMaxSize };
    const MaxLossOBJ = { name: <Trans>Max Loss</Trans>, onlyDolarSymbol: true, setState: setMaxLoss };
    const RewardOBJ = { name: <Trans>Planned reward level</Trans>, onlyDolarSymbol: false, setState: setReward };
    const RiskOBJ = { name: <Trans>Planned risk level</Trans>, onlyDolarSymbol: false, setState: setRisk };

    const averagePrice = { name: <Trans>Average price</Trans>, onlyDolarSymbol: "$/sh", val: AvergaPrice };
    const sharesTotals = { name: <Trans>Total shares</Trans>, onlyDolarSymbol: "Sh", val: SharesTotals };
    const sizeAvgPrice = { name: <Trans>Average Price</Trans>, onlyDolarSymbol: "$", val: SizeAvgPrice };
    const plannedReward = { name: <Trans>Planned Reward</Trans>, onlyDolarSymbol: "$", dolars: PlannedReward, percent: PlannedRewardPerc };
    const plannedLoss = { name: <Trans>Planned Loss</Trans>, onlyDolarSymbol: false, dolars: PlannedLoss, percent: PlannedLossPerc };
    const relationRiskReward = { name: <Trans>Risk Reward</Trans>, onlyDolarSymbol: ":1", val: RelationRiskReward };


    const referenceEntry = { name: <Trans>Reference Entry</Trans>, setState: setReferenceEntry };
    const referenceShares = { name: <Trans>Reference Shares</Trans>, setState: setReferenceShares };

    const averagePriceExe = { name: <Trans>Average price</Trans>, onlyDolarSymbol: "$/sh", val: AvergaPriceExe };
    const sharesTotalsExe = { name: <Trans>Total shares</Trans>, onlyDolarSymbol: "Sh", val: SharesTotalsExe };
    const sizeAvgPriceExe = { name: <Trans>Average Price</Trans>, onlyDolarSymbol: "$", val: SizeAvgPriceExe };
    const plannedRewardExe = { name: <Trans>Planned Reward</Trans>, onlyDolarSymbol: "$", dolars: PlannedRewardExe, percent: PlannedRewardPercExe };
    const plannedLossExe = { name: <Trans>Planned Loss</Trans>, onlyDolarSymbol: false, dolars: PlannedLossExe, percent: PlannedLossPercExe };
    const relationRiskRewardExe = { name: <Trans>Risk Reward</Trans>, onlyDolarSymbol: ":1", val: RelationRiskRewardExe };



    //Unify objects by component
    const positionRules = { title: <Trans>Rules</Trans>, MaxSize: MaxSizeObj, PositionType: PositionTypeObj, MaxLoss: MaxLossOBJ, Reward: RewardOBJ, Risk: RiskOBJ }
    const positionPlan = {
        planningResults: {
            title: <Trans>Plan results</Trans>,
            averagePrice: averagePrice,
            sharesTotals: sharesTotals,
            sizeAvgPrice: sizeAvgPrice,
            plannedReward: plannedReward,
            plannedLoss: plannedLoss,
            relationRiskReward: relationRiskReward
        },
        planningInput: {
            title: <Trans>Plan</Trans>,
            referenceEntry: referenceEntry,
            referenceShares: referenceShares
        }
    };

    const positionExecute = {
        addExecution: {
            title: <Trans>Add executions</Trans>,
            deleteAllText: <Trans>delete all</Trans>,
            sharesLabel: <Trans>Shares</Trans>,
            priceLabel: <Trans>Price</Trans>,
            addButtonText: <Trans>Add</Trans>,
            isLong: isLong,
            swal: {
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                deletedTitle: 'Deleted!',
                deletedText: 'Your inputs has been deleted.',

                //--------- this files should have translation but swal is not understanding it

                // title: <Trans>Are you sure?</Trans>,
                // text: <Trans>You won't be able to revert this!</Trans>,
                // confirmButtonText: <Trans>Yes, delete it!</Trans>,
                // cancelButtonText: <Trans>Cancel</Trans>,
                // deletedTitle: <Trans>Deleted!</Trans>,
                // deletedText: <Trans>Your inputs has been deleted.</Trans>,
            }
        },
        executionResult: {
            title: <Trans>Executions</Trans>,
            sharesLabel: <Trans>Shares</Trans>,
            priceLabel: <Trans>Price</Trans>,
            editButtonText: <Trans>Edit</Trans>,
            enableButtonText: <Trans>Enable</Trans>,

        },
        executed: Executed,
        setExecuted: setExecuted,
        changeStoredExecute: ChangeStoredExecute,
        planningResults: {
            title: <Trans>Plan results executed</Trans>,
            averagePrice: averagePriceExe,
            sharesTotals: sharesTotalsExe,
            sizeAvgPrice: sizeAvgPriceExe,
            plannedReward: plannedRewardExe,
            plannedLoss: plannedLossExe,
            relationRiskReward: relationRiskRewardExe
        }
    };

    // Effect to get execution values from local storage
    useEffect(() => {
        const storedExecuted = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
        if (storedExecuted) setExecuted(storedExecuted);
    }, []);
    // Effect to set execution values to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE, JSON.stringify(Executed));
        calcAveragePriceExe();
    }, [Executed])

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
        setAvergaPriceExe(tempAvg.toFixed(3));
        setSharesTotalsExe(tempTotalSh.toFixed(2));
    }
    // CALCULATION AREA




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
